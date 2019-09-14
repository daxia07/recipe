import {elements, elementStrings} from './base';

export default class SearchView {
    constructor(item_num){
        this.item_num = item_num;
    }
    clear() {
        elements.resultList.innerHTML = '';
        elements.resultPages.innerHTML = '';
        console.log('cleared');
    }
    formatTitle(title, maxLength=34) {
        let post = '';
        if (title.length > maxLength) {
            post = '...';
        }
        let trimmedString = title.substr(0, maxLength);
        //re-trim if we are in the middle of a word
        return  trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + post
    }

    renderOneRecipe(ele) {
        return `            
            <li>
                <a class="results__link results__link--active" href="#${ele.id}">
                    <figure class="results__fig">
                        <img src="${elementStrings.baseUri + ele.image}" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${this.formatTitle(ele.title)}</h4>
                        <p class="results__author">ready in ${ele.readyInMinutes} Min | serve: ${ele.servings}</p>
                    </div>
                </a>
            </li>`
    }
    setupPages() {
        console.log(this.item_num);
    }

    loadRecipes(recipes) {
        // set up data
        let recipeStr = '';
        recipes.forEach(ele => {
           recipeStr += this.renderOneRecipe(ele);
        });
        elements.resultList.innerHTML = recipeStr;
        // set up pages
        this.setupPages();
        console.log('recipes loaded');
    }
}