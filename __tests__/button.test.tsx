import { Button } from '@/components/button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByText('Save'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
