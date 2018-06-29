import Search from './models/Search';
import * as searchView from './views/searchView'; 
import {elements} from './views/base';

const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {

        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();

        //wyszukanie przepisów
        await state.search.getResults();

        //wyniki na UI
        searchView.renderResults(state.search.result);
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
