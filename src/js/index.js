import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";
import RecipeView from "./views/RecipeView";
import {elements, renderLoader, clearLoader} from "./views/base";

const searchUI = new SearchView(10);
const recipeAPI = new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);

const bufferData = {};
let currentSearch = '';

const setupListeners = (actionSearch, actionRecipe) => {
    elements.searchBtn.addEventListener('click', (evt => {
        evt.preventDefault();
        actionSearch();
    }));
    elements.inputEnter.addEventListener("keyup", (evt => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            elements.searchBtn.click();
        }
    }));
    window.addEventListener('hashchange', (evt) => {
        evt.preventDefault();
        actionRecipe(location.hash.split('#')[1]);
    });
    elements.resultsBtnPrev.addEventListener('click', evt => {
        evt.preventDefault();
        searchUI.currentPage -= 1;
        searchUI.loadRecipes(bufferData[currentSearch]);
    });

    elements.resultsBtnNext.addEventListener('click', evt => {
        //TODO: load more btn to invoke search
        evt.preventDefault();
        searchUI.currentPage += 1;
        searchUI.loadRecipes(bufferData[currentSearch]);
    });
};

const doSearch = () => {
    // 1. extract info and do search, display spinner
    const query = elements.inputEnter.value;
    renderLoader(elements.searchSection);
    // 2. fetch data and clear ui
    // do search
    // 3. display data
    // 4. remove spinner
    elements.inputEnter.value = '';
    if (query) {
        recipeAPI.search(query, 1)
            .then((res) => {
                console.log(res);
                currentSearch = query;
                if (bufferData[query] === undefined) {
                    bufferData[query] = res;
                } else {
                    bufferData[query] = [...bufferData[query], ...res];
                }
                clearLoader();
                searchUI.loadRecipes(res);
            })
            .catch(error => console.log(error));
    }
};

const doRecipe = (rid) => {
    // 1. fetch data, display spinner
    renderLoader(elements.recipeSection);
    recipeAPI.getRecipe(rid)
        .then(recipe => {
            console.log(recipe);
            clearLoader();
            let recipeView = new RecipeView(recipe);
            recipeView.setupRecipe();
        });
    // 2. fetch data and clear ui
    // 3. display data
    // 4. remove spinner
};


const init = () => {
    setupListeners(doSearch, doRecipe);

    // setupListeners(doSearch, doRecipe);
    // searchUI.clear();
};

init();
// doTest();
// doSearch();
// doRecipe(1);

//auto test
window.onload = () => {
    elements.inputEnter.value = 'chicken';
    elements.searchBtn.click();
    document.querySelector('.results__link:last-of-type').click();
};




