import {elements} from './base';
export const updateLikesPanel = (likeList) => {
    let htmlStr = '';
    likeList.forEach(ele => {
        htmlStr += `<li>
                        <a class="likes__link" href="#${ele.id}">
                            <figure class="likes__fig">
                                <img src="${ele.image}" alt="Test">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${ele.title}</h4>
                                <p class="likes__author">${ele.sourceName}</p>
                            </div>
                        </a>
                    </li>`
    });
    elements.likesList.innerHTML = htmlStr;
};


export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};