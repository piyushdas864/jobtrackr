import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import jobsRoutes from './routes/jobs.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/jobtrackr';
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=>console.log('MongoDB connected'))
  .catch(e=>console.error('Mongo connect error', e));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

app.get('/', (req,res)=> res.json({ok:true, name:'JobTrackr API'}));

export default app;
