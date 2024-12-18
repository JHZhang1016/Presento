import { render, screen } from '@testing-library/react';
import Text from '../components/elements/Text';

describe('Text Component', () => {
  const mockContent = {
    text: 'Hello, world!',
    fontSize: 2,
    fontFamily: 'serif',
    color: '#FF0000',
  };

  it('renders text with all props correctly', () => {
    render(<Text content={mockContent} />);

    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle({ fontSize: '2em', color: '#FF0000' });
    expect(textElement).toHaveClass('font-serif');
  });

  it('uses default font size when fontSize is not provided', () => {
    render(<Text content={{ ...mockContent, fontSize: undefined }} />);

    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveStyle({ fontSize: '1em' });
  });

  it('uses default font size when fontSize is invalid', () => {
    render(<Text content={{ ...mockContent, fontSize: 'invalid' }} />);
    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveStyle({ fontSize: '1em' });
  });

  it('uses default font family when fontFamily is not provided', () => {
    render(<Text content={{ ...mockContent, fontFamily: undefined }} />);

    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveClass('font-sans');
  });

  it('uses default font family when fontFamily is invalid(or unsupported family', () => {
    render(<Text content={{ ...mockContent, fontFamily: 'unsupported-family' }} />);

    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveClass('font-sans');
  });

  it('uses default color when color is not provided', () => {
    render(<Text content={{ ...mockContent, color: undefined }} />);
    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveStyle({ color: '#000000' });
  });

  it('uses default color when color is not valid', () => {
    render(<Text content={{ ...mockContent, color: "invalid" }} />);
    const textElement = screen.getByText(/hello, world!/i);
    expect(textElement).toHaveStyle({ color: '#000000' });
  });
});
