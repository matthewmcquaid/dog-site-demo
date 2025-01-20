import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import logo from './dog.svg';
import './App.css';
import CustomButton from './components/CustomButton.js';
import Dog from './components/Dog.js';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
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
    axios.post('http://localhost:3001/api/data', { name, age })
      .then(response => {
        setData([...data, response.data]);
        setName('');
        setAge('');
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='App-header'>DOGS!</div>
      </header>
    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          placeholder="Age"
          onChange={e => setAge(e.target.value)}
        />
        <CustomButton type="submit">ADD</CustomButton>
      </form>

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
    </div>
  );
}

export default App;