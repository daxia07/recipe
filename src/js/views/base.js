export const elements = {
    searchSection: document.querySelector('.results'),
    recipeSection: document.querySelector('.recipe'),
    resultList: document.querySelector('.results__list'),
    resultPages: document.querySelector('.results__pages'),
    searchBtn: document.querySelector('.search__btn'),
    inputEnter: document.querySelector('.search__field'),
    recipeFig: document.querySelector('.recipe__img'),
    recipeDataMinutes: document.querySelector('.recipe__info-data--minutes'),
    recipeDataPeople: document.querySelector('.recipe__info-data--people'),
    recipeTitle: document.querySelector('.recipe__title'),
    recipeIngredientList: document.querySelector('.recipe__ingredient-list'),
    recipeBy: document.querySelector('.recipe__by'),
    recipeBtn: document.querySelector('.recipe__directions .recipe__btn'),
    resultsBtnPrev: document.querySelector('.results__btn--prev'),
    resultsBtnNext: document.querySelector('.results__btn--next')
};

export const elementStrings = {
    loader: 'loader',
    baseUri: 'https://spoonacular.com/recipeImages/'
};


export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};