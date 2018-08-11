import Search from './models/Search';
import Recepie from './models/Recepie';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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

        try {
            //wyszukanie przepisów
            await state.search.getResults();

            clearRender();
            //wyniki na UI
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error);
            clearRender();
        }

    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goTo = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goTo);
    }
});


const controlRecaipe = async () => {
        const id = window.location.hash.replace('#', '');

        if (id) {
            recipeView.clearRecipe();
            renderLoader(elements.recipe);

            if(state.search) searchView.highlightSelected(id);

            state.recipe = new Recepie(id);

            try {
                await state.recipe.getRecipe();
                state.recipe.parseIngredients();
                state.recipe.calcTime();
                state.recipe.calcServings();

                clearRender();
                recipeView.rendeRecipe(state.recipe);

            } catch (error) {
                alert(error);
            }

        }
    }
    ['hashchange', 'load'].forEach(e => {
        window.addEventListener(e, controlRecaipe);
    });
