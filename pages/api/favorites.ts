import { listFavoritesData, toggleFavoriteData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = String(req.body?.userEmail || req.query.userEmail || session?.user?.email || '');

  if (!userEmail) {
    return res.status(400).json({ message: 'userEmail is required.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ favorites: await listFavoritesData(userEmail) });
  }

  if (req.method === 'POST') {
    const productId = String(req.body.productId || '');
    if (!productId) return res.status(400).json({ message: 'productId is required.' });
    return res.status(200).json(await toggleFavoriteData(userEmail, productId));
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
