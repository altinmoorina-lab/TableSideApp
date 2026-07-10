import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { render, screen } from '@testing-library/react';

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={products[0]} />);
    expect(screen.getByText('MacBook Air M4')).toBeInTheDocument();
    expect(screen.getByText('$1199')).toBeInTheDocument();
  });
});
