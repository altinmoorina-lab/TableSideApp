import { createReviewData, listReviewsData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ reviews: await listReviewsData(String(req.query.productId || '')) });
  }

  if (req.method === 'POST') {
    const { productId, author, rating, comment } = req.body;
    if (!productId || !author || !rating || !comment) {
      return res.status(400).json({ message: 'productId, author, rating, and comment are required.' });
    }
    return res.status(201).json({ review: await createReviewData({ productId, author, rating: Number(rating), comment }) });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
