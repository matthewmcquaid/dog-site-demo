import React from 'react';

const Dog = ({ dog }) => {
    return (
        <>
            <h2>{dog.name}</h2>
            <p>{dog.age} years old</p>
        </>
    );
}

export default Dog;
