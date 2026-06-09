import {
  createReservation,
  loginUser,
  registerUser,
  resetPassword,
} from '../services/table-side-api';

describe('TableSide API Service', () => {
  it('should login a user successfully', async () => {
    const user = await loginUser({ email: 'test@example.com', password: 'password123' });
    expect(user.id).toBe('user-1');
    expect(user.email).toBe('test@example.com');
  });

  it('should register a new user', async () => {
    const user = await registerUser({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should return success when resetting password', async () => {
    const result = await resetPassword('test@example.com');
    expect(result.success).toBe(true);
    expect(result.email).toBe('test@example.com');
  });

  it('should create a reservation', async () => {
    const res = await createReservation({
      restaurantId: 'rest-1',
      date: '2025-10-10',
      time: '19:00',
      guests: 2,
    });
    expect(res.status).toBe('Confirmed');
    expect(res.restaurantId).toBe('rest-1');
  });
});
