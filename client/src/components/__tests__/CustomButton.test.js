import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton from '../CustomButton';

describe('CustomButton', () => {
  it('renders with the correct text', () => {
    render(<CustomButton>Click Me</CustomButton>);


    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the primary variant styles', () => {
    render(<CustomButton variant="primary">Primary Button</CustomButton>);

    const buttonElement = screen.getByText(/primary button/i);
    expect(buttonElement).toHaveClass('MuiButton-contained'); 
  });

  it('applies the secondary variant styles', () => {
    render(<CustomButton variant="secondary">Secondary Button</CustomButton>);

    const buttonElement = screen.getByText(/secondary button/i);
    expect(buttonElement).toHaveClass('MuiButton-contained');
  });

  it('fires the onClick event', () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);

    const buttonElement = screen.getByText(/click me/i);

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});