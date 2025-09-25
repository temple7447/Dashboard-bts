import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders with custom text', () => {
    render(<LoadingSpinner text="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  test('renders without text when text prop is null', () => {
    render(<LoadingSpinner text={null} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('renders fullscreen when fullScreen prop is true', () => {
    const { container } = render(<LoadingSpinner fullScreen={true} />);
    expect(container.firstChild).toHaveClass('fixed', 'inset-0');
  });
});