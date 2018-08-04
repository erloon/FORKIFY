import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
const lineRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="likes__link" href="#${recipe.recipe_id}">
            <figure class="likes__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${lineRecipeTitle(recipe.title)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page,type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle- ${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>`;

const renderButtons = (page,numResults,resPerPae)=>{

    const pages = Math.ceil(numResults/resPerPae);
    let button;

    if(page ===1 && pages>1){
        button = createButton(page,'next');
    }else if(page<pages)
    {
        button = `${createButton(page,'next')}
                  ${createButton(page,'prev')}`;
    }
    else if(page===pages && pages>1){
        button = createButton(page,'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page*resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page,recipes.length,resPerPage);
};
