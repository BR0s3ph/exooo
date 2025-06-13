import express from 'express';
import './config/mongoose.client';
import { router } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Authentication is running on http://localhost:${PORT}`);
});