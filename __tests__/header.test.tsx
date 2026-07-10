import { Header } from '@/components/header';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null }),
  signOut: jest.fn(),
}));

describe('Header', () => {
  it('renders primary navigation', () => {
    render(<Header />);
    expect(screen.getByText(/TechHub/)).toBeInTheDocument();
    expect(screen.getAllByText('Products')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });
});
