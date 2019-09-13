import RecipeAPI from './models/RecipeAPI';
import SearchView from "./views/SearchView";

const init = () => {
    //1. clean up default variables in html;
    //2. setup api
    //3. add on click listeners
    const searchUI = new SearchView(10);
    // searchUI.clear();
    return {
        recipeAPI: new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST),
        searchUI
    }
};

const {recipeAPI, searchUI} = init();

let ret;

// do search
recipeAPI.search('chicken', 1)
    .then((res)=>{
        console.log(res);
        ret = res;
    })
    .catch(error=>console.log(error));

console.log('Done!');