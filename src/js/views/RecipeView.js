import {elements} from './base';

export default class RecipeView {
    constructor(recipe) {
        this.recipe = recipe;
    }

    pickedIngredients(ele) {
        const picker = (({ amount, unit, name }) => ({ amount, unit, name }));
        return picker(ele);
    }

    renderIngredients(currentServe=1) {
        let htmlStr = '';
        this.recipe.extendedIngredients.forEach(ele => {
            let amount = (ele.amount * currentServe / this.recipe.servings).toFixed(2);
            if (amount.length > 3) {
                amount = amount.replace('.00', '');
            }
            htmlStr += `
                <li class="recipe__item">
                    <svg class="recipe__icon">
                        <use href="/static/img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">${amount}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${ele.unit}</span>
                        ${ele.name}
                    </div>
                </li>`
        });
        elements.recipeIngredientList.innerHTML = htmlStr;
    }

    setupRecipe() {
        elements.recipeFig.src = this.recipe.image;
        elements.recipeTitle.innerHTML = `<span>${this.recipe.title}</span>`;
        this.renderIngredients(this.recipe.servings);
        elements.recipeDataMinutes.innerHTML = this.recipe.readyInMinutes;
        elements.recipeDataPeople.innerHTML = this.recipe.servings;
        elements.recipeBy.innerHTML = this.recipe.sourceName;
        elements.recipeBtn.setAttribute('href', this.recipe.sourceUrl);
        this.showLikedBtn();
    }

    showLikedBtn() {
        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        let iconString = 'icon-heart-outlined';
        likedList.forEach(ele => {
            if (ele.id === parseInt(location.hash.split('#')[1])) {
                iconString = 'icon-heart';
            }
        });
        elements.likeIcon.children[0].setAttribute('href', `/static/img/icons.svg#${iconString}`);
    }

    toggleLikeBtn(isLiked) {
        const iconString = isLiked ? 'icon-heart-outlined':'icon-heart';
        elements.likeIcon.children[0].setAttribute('href', `/static/img/icons.svg#${iconString}`);
        // icons.svg#icon-heart-outlined
    }
}