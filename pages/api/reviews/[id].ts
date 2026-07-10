import { deleteReviewData, updateReviewData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);

  if (req.method === 'PUT') {
    const { author, rating, comment } = req.body;
    const review = await updateReviewData(id, {
      author,
      rating: rating ? Number(rating) : undefined,
      comment,
    });

    return review ? res.status(200).json({ review }) : res.status(404).json({ message: 'Review not found' });
  }

  if (req.method === 'DELETE') {
    const deleted = await deleteReviewData(id);
    return deleted ? res.status(200).json({ ok: true }) : res.status(404).json({ message: 'Review not found' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
