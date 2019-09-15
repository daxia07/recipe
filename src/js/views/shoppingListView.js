import {elements} from "./base";

export const endingZeros = (num) => {
    if (num < 10) {
        return '1'
    }
    let ending_str = '';
    while (num >= 10) {
        num = Math.floor(num/10);
        ending_str += '0';
    }
    return '1' + ending_str
};

export  function updateShoppingList(shoppingList) {
    let htmlStr = '';
    shoppingList.forEach(item => {
        htmlStr += `<li class="shopping__item">
                        <div class="shopping__count">
                            <input type="number" value="${item.amount}" step="${endingZeros(item.amount)}">
                            <p>${item.unit}</p>
                        </div>
                        <p class="shopping__description">${item.name}</p>
                        <button class="shopping__delete btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-cross"></use>
                            </svg>
                        </button>
                    </li>`;
    });

    elements.shoppingList.innerHTML = htmlStr;
};