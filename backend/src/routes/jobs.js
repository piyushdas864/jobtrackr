import { Router } from 'express';
import Job from '../models/Job.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// list user's jobs
router.get('/', requireAuth, async (req,res)=>{
  const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(jobs);
});

// create job
router.post('/', requireAuth, async (req,res)=>{
  const { company, role, status, notes } = req.body;
  if(!company || !role) return res.status(400).json({ error: 'company and role required' });
  const job = await Job.create({ userId: req.user.id, company, role, status, notes });
  res.status(201).json(job);
});

// update job status or fields
router.patch('/:id', requireAuth, async (req,res)=>{
  const updates = (({ company, role, status, notes })=>({ company, role, status, notes }))(req.body);
  const job = await Job.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, updates, { new: true });
  if(!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
});

// delete
router.delete('/:id', requireAuth, async (req,res)=>{
  const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if(!job) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
