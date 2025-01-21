import React from 'react';
import CustomButton from './CustomButton.js';


const DogForm = ({ name, age, breed, breeds, handleSubmit, setName, setBreed, setAge}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={name}
                    placeholder='Name'
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='number'
                    value={age}
                    placeholder='Age'
                    onChange={e => setAge(e.target.value)}
                />
                <select id='dropdown' value={breed} onChange={e => setBreed(e.target.value)}>
                <option value=''>Select Breed</option>
                    {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                    ))}
                </select>
                <CustomButton type='submit' onClick={handleSubmit} testId={'add-button'}>ADD</CustomButton>
            </form>
        </>
    )
};
export default DogForm;