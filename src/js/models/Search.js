import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const key = '2358affaa464e855cda1bb60cdd55165';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const parameters = `key=${key}&q=${this.query}`;
        const link = 'http://food2fork.com/api/search?';

        try {
            const retval = await axios(`${proxy}${link}${parameters}`);
            this.result = retval.data.recipes;
            console.log(result.data.recipes);
        } catch (error) {
            alert(error);
        }
    }
}
