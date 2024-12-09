
import { render, screen } from '@testing-library/react';
import Quizz1 from './Quizz1';

test('renders the component with an image and heading', () => {
    render(<Quizz1 {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Select 2 words related to the show');
    expect(screen.getByAltText('Test Show')).toBeInTheDocument();
});

test('renders the component', () => {
    const { getByText, getByAltText } = render(<Quizz1 {...defaultProps} />);
    expect(getByText('Select 2 words related to the show')).toBeInTheDocument();
    expect(getByAltText('Test Show')).toBeInTheDocument();
});
  
