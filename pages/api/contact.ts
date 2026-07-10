import { createContactMessageData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message || message.length < 10) {
    return res.status(400).json({ message: 'Valid name, email, and message are required.' });
  }

  return res.status(201).json({ message: await createContactMessageData({ name, email, message }) });
}
