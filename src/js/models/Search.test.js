import RecipeAPI from './Search';

let url = (process.env.NODE_ENV !== 'production'? process.env.API_PROXY:'') + process.env.API_URL;

console.log(url);

const ffAPI = new RecipeAPI(url, process.env.API_KEY);

ffAPI.search('chicken').then(()=>console.log('Done')).catch(error=>console.log(error));

console.log('Done P');