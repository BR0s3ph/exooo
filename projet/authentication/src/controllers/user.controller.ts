import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import argon from "argon2";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { StringValue } from 'ms';

export const userController = {

  async createUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, image, description } = req.body;
    if (!firstname || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // 409 : conflict
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    
    const hashedPassword = await argon.hash(password);

    const uuid = uuidv4(); // Generate a new UUID if not provided
    const newUser = new User({
      uuid,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      image,
      description,
      roleId: 2,// Default roleId for new users (user)
    });
    await newUser.save();
    
    // 201 : created
    res.status(201).json({
      data: {
        uuid: newUser.uuid,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        image: newUser.image,
        description: newUser.description,
        roleId: newUser.roleId,
      },
      message: "User created successfully",
    });
  },

  async getAllUsers(req: Request, res: Response) {
    const users = await User.find({}, "-password"); // Exclude password field
    // Dans tous les cas un récupération d'une liste d'entité ne renverra d'erreur de type 400 (utilisateur)
    // PAr contre comme ailleurs cela peut renvoyer une erreur de type 500 (serveur)
    res.status(200).json({ data: users });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      // 401 : Unauthorized
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      // On utilise le même code d'erreur pour éviter de révéler si l'email existe ou non
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    // En fonction des besoins d'affichage des informations utilisateurs, on décidera d'ajouter ou non les infos dans le token
    const token = jwt.sign(
      { uuid: user.uuid, email: user.email, roleId: user.roleId },
      (process.env.JWT_SECRET || "default_secret_key") as string,
      { expiresIn: (process.env.JWT_EXPIRATION || "1h") as StringValue } // Default expiration time of 1 hour
    );

    res.status(200).json({
      data: {
        uuid: user.uuid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.image,
        description: user.description,
        roleId: user.roleId,
      },
      token, // Return the JWT token
      message: "Login successful",
    });
  },
};