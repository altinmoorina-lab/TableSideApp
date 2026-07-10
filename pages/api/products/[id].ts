import { deleteProductData, findProductData, updateProductData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);

  if (req.method === 'GET') {
    const product = await findProductData(id);
    return product ? res.status(200).json({ product }) : res.status(404).json({ message: 'Product not found' });
  }

  if (req.method === 'PUT') {
    const product = await updateProductData(id, req.body);
    return product ? res.status(200).json({ product }) : res.status(404).json({ message: 'Product not found' });
  }

  if (req.method === 'DELETE') {
    const deleted = await deleteProductData(id);
    return deleted ? res.status(200).json({ ok: true }) : res.status(404).json({ message: 'Product not found' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
