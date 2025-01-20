import React from 'react';
import CustomButton from './CustomButton.js';
import Dog from './Dog.js';

const DogList = ({ data, breeds , dogBreedNam, handleDelete,dogBreedName }) => {
    return (
        <>
        <h2>Fetched Data:</h2>
        <ul>
            {data ? data.map((item) => (
            <li key={item.id} className='Dog-List'>
                <Dog dog={item} breedName={dogBreedName(item.breed_id, breeds)} />
                <CustomButton onClick={e => handleDelete(item.id)}>DELETE</CustomButton>
            </li>
            )):
            <div>No Data</div>}
        </ul>
        </>
    );
}

export default DogList;

