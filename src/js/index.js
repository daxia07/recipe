import RecipeAPI from './models/Search';

const init = () => {
    // let url = (process.env.DEBUG === 'true'? process.env.API_PROXY:'') + process.env.API_URL;
    return new RecipeAPI(process.env.API_URL, process.env.API_KEY, process.env.API_HOST);
};

const ffAPI = init();

let ret;
ffAPI.search('chicken', 1)
    .then((res)=>{
        console.log(res);
        ret = res;
    })
    .catch(error=>console.log(error));

console.log('Done!');