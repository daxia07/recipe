import {elements} from './base';

export default class SearchView {
    constructor(item_num){
        this.item_num = item_num;
    }
    clear() {
        elements.resultList.innerHTML = '';
        elements.resultPages.innerHTML = '';
        console.log('cleared');
    }
    renderOneRecipe(item) {
        return item;
    }
    setupPages() {
        console.log(this.item_num);
    }
    loadRecipes(recipes) {
        // set up data
        // set up pages
        this.setupPages();
        console.log('recipes loaded');
    }
}