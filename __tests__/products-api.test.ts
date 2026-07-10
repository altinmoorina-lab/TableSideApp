import handler from '@/pages/api/products';
import { createMocks } from 'node-mocks-http';

describe('/api/products', () => {
  it('returns products', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).products.length).toBeGreaterThanOrEqual(10);
  });

  it('creates a product', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'USB-C Hub',
        brand: 'Anker',
        category: 'Accessories',
        price: 49,
        stock: 20,
        rating: 4.4,
        image: '',
        featured: false,
        description: 'Compact hub for laptops.',
        specs: ['HDMI', 'USB-C'],
      },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData()).product.name).toBe('USB-C Hub');
  });
});
