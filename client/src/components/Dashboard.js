import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DogForm from './DogForm.js';
import DogList from './DogsList.js';

function Dashboard() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [breeds, setBreeds] = useState([]);

    const getDogs = useCallback(async () => {
        const data = await axios.get('http://localhost:3001/api/data')
        .then(response => {
        return response.data;
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        setData(data);
    }, [])

    const getBreeds = useCallback(async () => { 
        const breeds = await axios.get('http://localhost:3001/api/breeds')
        .then(response => {
        return response.data;
        })
        .catch(error => {
        console.error('Error fetching breeds:', error);
        });
        setBreeds(breeds);
    }, [])

    useEffect(() => {
        getDogs()
        .catch(console.error);
        getBreeds()
        .catch(console.error);
    }, [getDogs, getBreeds]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (breed === '') {
        alert('Please select dog\'s breed.');
        return;
        }

        if (name === '') {
        alert('Please select dog\'s name.');
        return;
        }

        if (age === '') {
        alert('Please input dog\'s age.');
        return;
        }

        axios.post('http://localhost:3001/api/data', { name, age, breed_id: breed })
        .then(response => {
            setData([...data, response.data]);
            setName('');
            setAge('');
            setBreed('');
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    };

    const handleDelete = (id) => {

        axios.delete(`http://localhost:3001/api/data/${id}`)
        .then(() => {
            getDogs();
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    };


    function dogBreedName(breedId, breeds) {
        return breeds?.find(breed => breed.id === breedId)?.name || null;
    }

    return (
        <div className='Dashboard'>
            <DogForm name={name} age={age} breed={breed} breeds={breeds} handleSubmit={handleSubmit} setName={setName} setBreed={setBreed} setAge={setAge} />
            <DogList data={data} breeds={breeds} dogBreedName={dogBreedName} handleDelete={handleDelete} />
        </div>
    );
}

export default Dashboard;