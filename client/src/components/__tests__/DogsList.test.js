import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DogsList from '../DogsList';

describe('DogsList', () => {

    const handleDeleteMock = jest.fn();
    const dogBreedNameMock = jest.fn();

    const dogs = [
        { id: 1, name: 'Fido', age: 3 , bread_id: 1},
        { id: 2, name: 'Spot', age: 5, bread_id: 2},
        { id: 3, name: 'Rex', age: 7, bread_id: 2}
    ];

    const breeds = [
        { id: 1, name: 'Golden Retriever' },   
        { id: 2, name: 'Poodle' }
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of dogs', () => {
       
        render(<DogsList data={dogs} breeds={breeds} handleDelete={handleDeleteMock} dogBreedName={dogBreedNameMock}  />);
        expect(screen.getAllByTestId('dog').length).toBe(3);
    });

    it('renders the correct dog names', () => {

        render(<DogsList data={dogs} breeds={breeds} handleDelete={handleDeleteMock} dogBreedName={dogBreedNameMock} />);
        expect(screen.getByText(/Fido/i)).toBeInTheDocument();
        expect(screen.getByText(/Spot/i)).toBeInTheDocument();
        expect(screen.getByText(/Rex/i)).toBeInTheDocument();
    });

    it('renders the correct dog ages', () => {
    
        render(<DogsList data={dogs} breeds={breeds} handleDelete={handleDeleteMock} dogBreedName={dogBreedNameMock} />);
        expect(screen.getByText(/3 years old/i)).toBeInTheDocument();
        expect(screen.getByText(/5 years old/i)).toBeInTheDocument();
        expect(screen.getByText(/7 years old/i)).toBeInTheDocument();
    });

    it('renders the correct breed name', () => {

        dogBreedNameMock.mockReturnValue('Poodle').mockReturnValueOnce('Golden Retriever');

        render(<DogsList data={dogs} breeds={breeds} handleDelete={handleDeleteMock} dogBreedName={dogBreedNameMock} />);
        expect(screen.getByText(/Golden Retriever/i)).toBeInTheDocument();
    });

    it('fires the handleDelete event', () => {
        render(<DogsList data={dogs} breeds={breeds} handleDelete={handleDeleteMock} dogBreedName={dogBreedNameMock} />);
        const deleteButton = screen.getAllByTestId('delete-button')[0];
        deleteButton.click();
        expect(handleDeleteMock).toHaveBeenCalledTimes(1);
        expect(handleDeleteMock).toHaveBeenCalledWith(1);
    });


});