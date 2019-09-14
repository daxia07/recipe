import {elements} from './base';

export default class RecipeView {
    constructor(recipe) {
        this.recipe = recipe;
    }

    renderIngredients() {
        let htmlStr = '';
        this.recipe.extendedIngredients.forEach(ele => {
            htmlStr += `
                <li class="recipe__item">
                    <svg class="recipe__icon">
                        <use href="img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">${ele.amount}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${ele.unit}</span>
                        ${ele.name}
                    </div>
                </li>`
        });
        return htmlStr
    }

    setupRecipe() {
        elements.recipeFig.src = this.recipe.image;
        elements.recipeTitle.innerHTML = `<span>${this.recipe.title}</span>`;
        elements.recipeIngredientList.innerHTML = this.renderIngredients();
        elements.recipeDataMinutes.innerHTML = this.recipe.readyInMinutes;
        elements.recipeDataPeople.innerHTML = this.recipe.servings;
        elements.recipeBy.innerHTML = this.recipe.sourceName;
        console.log(this.recipe.sourceUrl);
        elements.recipeBtn.setAttribute('href', this.recipe.sourceUrl);
    }
}