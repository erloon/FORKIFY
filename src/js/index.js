import Search from './models/Search';

const state = {}

const controlSearch = async () => {
    const query = 'pizza';
    if (query) {

        state.search = new Search(query);

        // przygotowanie do wyników

        //wyszukanie przepisów
        await state.search.getResults();

        //wyniki na UI
        console.log(state.search.result);
    }
}


document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
