import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";
import {elements, renderLoader, clearLoader} from "./views/base";

const searchUI = new SearchView(10);
const recipeAPI = new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);

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
};

const doTest = () => {
    recipeAPI.doTest().then(() => console.log('after promise'));
};

const doSearch = () => {
    // 1. extract info and do search, display spinner
    const query = elements.inputEnter.value;
    //debugging
    // query = 'chicken';
    // renderLoader(elements.searchSection);
    // 2. fetch data and clear ui
    // do search
    // TEST!!
    if (query) {
        recipeAPI.search(query, 1)
            .then((res) => {
                console.log(res);
                // clearLoader();
            })
            .catch(error => console.log(error));
    }
    // 3. display data
    // 4. remove spinner
};

const doRecipe = (rid) => {
    // 1. fetch data, display spinner
    recipeAPI.getRecipe(rid)
        .then(recipe => console.log(recipe));
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

// TODO: why is it I cannot set value to DOM element? It seems keep refreshing all the time! Event Listener not working!
// window.addEventListener('loadend', () => {
//     elements.inputEnter.innerHTML = 'chicken';
//     elements.searchBtn.click();
// });
//
// recipeAPI.search('chicken', 1)
//     .then((res) => {
//         console.log(res);
//         // clearLoader();
//     })
//     .catch(error => console.log(error));


