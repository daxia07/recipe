import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";
import RecipeView from "./views/RecipeView";
import {elements, renderLoader, clearLoader} from "./views/base";
import {updateLikesPanel} from "./views/LikeView";
import {updateShoppingList, endingZeros} from "./views/shoppingListView";

const searchUI = new SearchView(10);
const recipeAPI = new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);

//TODO: fetch a random recipe
//TODO: fetch a random search
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
        //TODO: load more btn for  search category and parameters
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
                currentServe -= 1;
                recipeView.renderIngredients(currentServe);
                elements.serveNum.textContent = currentServe.toString();
            }
        } else {
            // do add
            currentServe += 1;
            recipeView.renderIngredients(currentServe);
            elements.serveNum.textContent = currentServe.toString();
        }
    }));
    elements.recipeAddList.addEventListener('click', evt => {
        // add to list
        evt.preventDefault();
        currentServe = parseInt(elements.serveNum.textContent);
        // do more
        for (let ingredient of recipeView.recipe.extendedIngredients) {
            let ingredientPack = recipeView.pickedIngredients(ingredient);
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
    elements.shoppingListDelete.addEventListener('click', evt => {
        const closestBtn = evt.target.closest('button.btn-tiny');
        let shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
        if (evt.target && closestBtn) {
                const name = closestBtn.parentNode.querySelector('.shopping__description').textContent;
                shoppingList = shoppingList.filter(item => item.name !== name);
                updateShoppingList(shoppingList);
                localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        }
        });
    elements.shoppingListInput.addEventListener('input', evt => {
        console.log(evt.target);
        let value = evt.target.value;
        name = evt.target.parentNode.parentNode.children[1].textContent;
        console.log(name);
        let shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
        for (let i=0; i < shoppingList.length; i++ ) {
            if (shoppingList[i].name === name) {
                shoppingList[i].amount = parseFloat(value);
                evt.target.step = endingZeros(parseFloat(value));
                break;
            }
        }
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
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
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    shoppingList = shoppingList.filter(ele => ele.amount > 0);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateShoppingList(shoppingList);
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




