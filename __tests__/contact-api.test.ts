import handler from '@/pages/api/contact';
import { createMocks } from 'node-mocks-http';

describe('/api/contact', () => {
  it('saves valid contact messages', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Altin',
        email: 'altin@example.com',
        message: 'I want to ask about laptop stock.',
      },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
  });
});
