import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";
import RecipeView from "./views/RecipeView";
import {elements, renderLoader, clearLoader} from "./views/base";
import {updateLikesPanel} from "./views/LikeView";
import updateShoppingList from "./views/shoppingListView";

const searchUI = new SearchView(10);
const recipeAPI = new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);
let recipeView = {};

const bufferData = {};
let currentSearch = '';
let shoppingList = [];
let currentServe = 0;

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
    elements.likeIcon.addEventListener('click', evt => {
        evt.preventDefault();
        const closestEle = evt.target.closest('svg');
        const isLiked = closestEle.children[0].getAttribute('href').split('#')[1] === 'icon-heart';
        recipeView.toggleLikeBtn(isLiked);
        let likedList = JSON.parse(localStorage.getItem('likedList') || '[]');
        if (!isLiked) {
            // add data to localStorage
            let recipeLiked = {
                id: recipeView.recipe.id,
                image: recipeView.recipe.image,
                title: recipeView.recipe.title,
                sourceName: recipeView.recipe.sourceName
            };
            likedList.push(recipeLiked);
        } else {
            likedList = likedList.filter(ele => ele.id !== recipeView.recipe.id);
        }
        localStorage.setItem('likedList', JSON.stringify(likedList));
        console.log(localStorage.getItem('likedList'));
        // update view
        updateLikesPanel(likedList);
    });
    elements.btnTiny.forEach(btn => btn.addEventListener('click', evt => {
        evt.preventDefault();
        currentServe = parseInt(elements.serveNum.textContent);
        const closestEle = evt.target.closest('button.btn-tiny');
        if (closestEle.getElementsByTagName('use')[0].getAttribute('href').includes('minus')) {
            // do minus
            if (currentServe < 2) {
                alert('Cannot do minus any more!');
            } else {
                console.log('minus clicked');
                currentServe -= 1;
                recipeView.renderIngredients(currentServe);
                elements.serveNum.textContent = currentServe.toString();
            }
        } else {
            // do add
            console.log('add clicked');
            currentServe += 1;
            recipeView.renderIngredients(currentServe);
            elements.serveNum.textContent = currentServe.toString();
        }
    }));
    elements.recipeAddList.addEventListener('click', evt => {
        // add to list
        currentServe = parseInt(elements.serveNum.textContent);
        evt.preventDefault();
        // do more
        for (let ingredient of recipeView.recipe.extendedIngredients) {
            let ingredientPack = recipeView.pickedIngredients(ingredient);
            console.log(ingredientPack);
            ingredientPack.amount *= currentServe / recipeView.recipe.servings;
            let existed = false;
            for (let i of shoppingList) {
                if (i.name === ingredientPack.name) {
                    i.amount += ingredientPack.amount;
                    existed = true;
                    break;
                }
            }
            if (!existed) {
                shoppingList.push(ingredientPack);
            }
        }
        updateShoppingList(shoppingList);
    });
    elements.shoppingList.addEventListener('click', evt => {
        console.log('delete clicked!');
        const closestEle = evt.target.closest('button.btn-tiny');
        const name = closestEle.parentNode.querySelector('.shopping__description').textContent;
        shoppingList = shoppingList.filter(item => item.name !== name);
        updateShoppingList(shoppingList);
    })
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
            clearLoader();
            recipeView = new RecipeView(recipe);
            recipeView.setupRecipe();
        });
};


const init = () => {
    setupListeners(doSearch, doRecipe);

    // setupListeners(doSearch, doRecipe);
    // searchUI.clear();
};

console.log('do it');
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




