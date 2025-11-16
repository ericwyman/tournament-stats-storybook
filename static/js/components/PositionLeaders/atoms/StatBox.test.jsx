import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBox } from './StatBox';

describe('StatBox', () => {
  it('renders label and value correctly', () => {
    render(<StatBox label="HR" value="35" />);

    expect(screen.getByText('HR')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('applies default styling when not highlighted', () => {
    render(<StatBox label="AVG" value=".305" />);

    const container = screen.getByText('AVG').parentElement;
    expect(container).toHaveClass('bg-gray-50', 'border-gray-200');
  });

  it('applies highlighted styling when isHighlighted is true', () => {
    render(<StatBox label="HR" value="35" isHighlighted={true} />);

    const container = screen.getByText('HR').parentElement;
    expect(container).toHaveClass('bg-blue-50', 'border-blue-300');
  });

  it('displays rank when highlighted and rank is provided', () => {
    render(<StatBox label="HR" value="35" isHighlighted={true} rank={1} />);

    expect(screen.getByText(/Rank #1/)).toBeInTheDocument();
  });

  it('does not display rank when not highlighted', () => {
    render(<StatBox label="HR" value="35" isHighlighted={false} rank={1} />);

    expect(screen.queryByText(/Rank #1/)).not.toBeInTheDocument();
  });

  it('does not display rank when highlighted but rank is not provided', () => {
    render(<StatBox label="HR" value="35" isHighlighted={true} />);

    expect(screen.queryByText(/Rank/)).not.toBeInTheDocument();
  });

  it('handles numeric values', () => {
    render(<StatBox label="Games" value={162} />);

    expect(screen.getByText('162')).toBeInTheDocument();
  });

  it('handles string values with decimals', () => {
    render(<StatBox label="OPS" value=".987" />);

    expect(screen.getByText('.987')).toBeInTheDocument();
  });
});
