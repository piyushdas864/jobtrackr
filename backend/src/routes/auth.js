import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = Router();

router.post('/register', async (req,res)=>{
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'email,password required'});
  const exists = await User.findOne({ email });
  if(exists) return res.status(409).json({ error: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'email,password required'});
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
