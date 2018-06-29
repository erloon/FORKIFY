import axios from 'axios';

async function getResults(query) {
    const key = '2358affaa464e855cda1bb60cdd55165';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const parameters = `key=${key}&q=${query}`;
    const link = 'http://food2fork.com/api/search?';

    const result = await axios(`${proxy}${link}${parameters}`);

    console.log(`${proxy}${link}${parameters}`);
    console.log(result);
}
getResults('pizza');
'2358affaa464e855cda1bb60cdd55165'
'http://food2fork.com/api/search'
