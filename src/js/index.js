import Search from './models/Search';
import * as searchView from './views/searchView';
import {
    elements,
    renderLoader,
    clearRender
} from './views/base';

const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {

        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //wyszukanie przepisów
        await state.search.getResults();

        clearRender()
        //wyniki na UI
        searchView.renderResults(state.search.result);
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
