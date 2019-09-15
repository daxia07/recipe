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
        elements.recipeBtn.setAttribute('href', this.recipe.sourceUrl);
        this.showLikedBtn();
    }

    showLikedBtn() {
        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        let iconString = 'icon-heart-outlined';
        likedList.forEach(ele => {
            console.log(ele.id);
            console.log(parseInt(location.hash.split('#')[1]));
            if (ele.id === parseInt(location.hash.split('#')[1])) {
                iconString = 'icon-heart';
            }
        });
        elements.likeIcon.children[0].setAttribute('href', `img/icons.svg#${iconString}`);
    }

    toggleLikeBtn(isLiked) {
        const iconString = isLiked ? 'icon-heart-outlined':'icon-heart';
        elements.likeIcon.children[0].setAttribute('href', `img/icons.svg#${iconString}`);
        // icons.svg#icon-heart-outlined
    };
}