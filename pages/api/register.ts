import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { createUserData } from '@/lib/store';
import { addLocalUser } from '@/lib/local-users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Name, valid email, and password are required.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUserData({ name, email, passwordHash });
  addLocalUser({ id: user.id, name, email: email.toLowerCase(), passwordHash, role: 'user' });

  return res.status(201).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
