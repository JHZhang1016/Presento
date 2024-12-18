import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PresentationCard from '../components/PresentationCard';
import userEvent from '@testing-library/user-event';

const mockProps = {
  title: 'Sample Presentation',
  thumbnail_url: 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  description: 'Test description',
  slideCount: 3,
  id: 'presentationId',
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PresentationCard Component', () => {
  it('All props render correctly', () => {
    // Added <BrowserRouter> to avoid error, as PresentationCard uses useNavigate
    render(
      <BrowserRouter>
        <PresentationCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Sample presentation/i })).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByText(/3 slides/i)).toBeInTheDocument();
    const thumbnail = screen.getByRole('img', { name: /presentation's thumbnail/i });
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', mockProps.thumbnail_url);
  });

  it('renders slide text correctly for single slide', () => {
    render(
      <BrowserRouter>
        <PresentationCard {...mockProps} slideCount={1} />
      </BrowserRouter>
    );
    expect(screen.getByText(/1 slide/i)).toBeInTheDocument();
  });

  it('renders slide text correctly for zero slide', () => {
    render(
      <BrowserRouter>
        <PresentationCard {...mockProps} slideCount={0} />
      </BrowserRouter>
    );
    expect(screen.getByText(/0 slide/i)).toBeInTheDocument();
  });

  it('renders the slide count correctly', () => {
    render(
      <BrowserRouter>
        <PresentationCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/3 slides/i)).toBeInTheDocument();
  });

  it('navigates to the correct URL on click', async () => {
    render(
      <BrowserRouter>
        <PresentationCard {...mockProps} />
      </BrowserRouter>
    );

    const cardTitle = screen.getByRole('heading', { name: /sample presentation/i });
    await userEvent.click(cardTitle);

    expect(mockNavigate).toHaveBeenCalledWith('/presentation/presentationId');
  });
});

