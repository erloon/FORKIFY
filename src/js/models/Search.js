import axios from 'axios';
import {key,proxy} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
       
        const parameters = `key=${key}&q=${this.query}`;
        const link = 'http://food2fork.com/api/search?';

        try {
            const retval = await axios(`${proxy}${link}${parameters}`);
            this.result = retval.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}
