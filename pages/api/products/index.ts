import { createProductData, listProductsData } from '@/lib/store';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ products: await listProductsData() });
  }

  if (req.method === 'POST') {
    const product = await createProductData(req.body);
    return res.status(201).json({ product });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
