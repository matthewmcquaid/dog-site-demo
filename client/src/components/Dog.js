import React from 'react';

const Dog = ({ dog, breedName }) => {
    return (
        <>
            <h2>{dog.name}</h2>
            <p>{dog.age} years old</p>
            <p>{breedName}</p>
        </>
    );
}

export default Dog;
