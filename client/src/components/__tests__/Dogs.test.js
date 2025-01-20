import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dog from '../Dog';

describe('Dog', () => {

    it('renders the correct name', () => {
        const dog = { name: 'Fido', age: 3 };
        render(<Dog dog={dog} />);
        expect(screen.getByText(/fido/i)).toBeInTheDocument();
    });
    
    it('renders the correct age', () => {
        const dog = { name: 'Fido', age: 3 };
        render(<Dog dog={dog} />);
        expect(screen.getByText(/3 years old/i)).toBeInTheDocument();
    });

    it('renders the correct breed name', () => {
        const dog = { name: 'Fido', age: 3 };
        const breedName = 'Golden Retriever';
        render(<Dog dog={dog} breedName={breedName} />);
        expect(screen.getByText(/golden retriever/i)).toBeInTheDocument();
    });
    
});