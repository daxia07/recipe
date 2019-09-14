import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";
import {elements, renderLoader, clearLoader} from "./views/base";

const setupListeners = (actionSearch, actionRecipe) => {
    elements.searchBtn.addEventListener('click', actionSearch);
    elements.inputEnter.addEventListener("keyup", (evt => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            elements.searchBtn.click();
        }
    }));
    window.addEventListener('hashchange', () => {
        actionRecipe(location.hash.split('#')[1]);
    });
};

const doSearch = () => {
    // 1. extract info and do search, display spinner
    const query = elements.inputEnter.value;
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
    console.log(rid);
    // 1. fetch data, display spinner
    // 2. fetch data and clear ui
    // 3. display data
    // 4. remove spinner
    console.log('D');
};


const init = () => {
    //1. clean up default variables in html;
    //2. setup api
    //3. add on click listeners
    const searchUI = new SearchView(10);
    const recipeAPI = new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);
    setupListeners(doSearch, doRecipe);
    // searchUI.clear();
    return {
        recipeAPI,
        searchUI
    }
};

const {recipeAPI, searchUI} = init();

// TODO: why is it I cannot set value to DOM element? It seems keep refreshing all the time! Event Listener not working!
// window.addEventListener('loadend', () => {
//     elements.inputEnter.innerHTML = 'chicken';
//     elements.searchBtn.click();
// });



