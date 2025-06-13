import { connect } from 'mongoose';

export const initConnection = async (uri: string) => {
  try {
    await connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

initConnection(process.env.MONGODB_URI as string);