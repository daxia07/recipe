import {elements, elementStrings} from './base';

export default class SearchView {
    constructor(itemNum){
        this.itemNum = itemNum;
        this.currentPage = 1;
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

    loadRecipes(recipes) {
        // set up data
        console.log(this.currentPage);
        let recipeStr = '';
        let loopNum = Math.min(this.itemNum, recipes.length) + (this.currentPage - 1) * this.itemNum;
        for (let i=(this.currentPage-1)*this.itemNum; i < loopNum; i++) {
            recipeStr += this.renderOneRecipe(recipes[i]);
        }
        elements.resultsBtnNext.children[0].textContent = 'Page ' + (this.currentPage + 1).toString();
        if (this.currentPage === 1) {
            // first page no former pages
            elements.resultsBtnPrev.style.visibility = 'hidden';
        } else {
            // middle page
            elements.resultsBtnPrev.children[1].textContent = 'Page ' + (this.currentPage - 1).toString();
            elements.resultsBtnPrev.style.visibility = 'visible';
            if (this.currentPage !== Math.floor(recipes.length/this.itemNum)) {
                elements.resultsBtnNext.children[0].textContent = 'Page ' + (this.currentPage + 1).toString();
            } else {
                // last page, load more
                elements.resultsBtnNext.children[0].textContent = 'Load More';
            }
        }
        elements.resultList.innerHTML = recipeStr;

    }
}