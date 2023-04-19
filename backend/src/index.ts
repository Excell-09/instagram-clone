import express, { Response } from 'express';
import postRoutes from './routes//postRoutes';
import likeRoutes from './routes/likeRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import connectDB from './db/connect';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/like', likeRoutes);
app.use('/api/v1/comment', commentRoutes);

app.use((_, res: Response) => res.status(404).send('Route Not Exits'));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL as string);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
