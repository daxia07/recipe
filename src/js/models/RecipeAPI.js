import axios from 'axios';

export default class RecipeAPI {
    constructor(url, key, host) {
        this.url = url;
        this.key = key;
        this.host = host;
    }

    getReqeustOption(request) {
        return {
            method: 'get',
            url: request,
            headers: {
                'x-rapidapi-host': this.host,
                'x-rapidapi-key': this.key
            }}
    }

    async getRecipe(rid) {
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            try {
                return import('assets/mockdata/recipe_info.json').then(mod => Promise.resolve(mod.default.results));
            } catch (e) {
                console.log(e);
            }
        } else {
            let api_request = `${this.url}recipes/${rid}/information`;
            try {
                return axios(this.getReqeustOption(api_request)).then(res => Promise.resolve(res.data))
            } catch (e) {
                console.log(e);
            }
        }
    }


    async search(query, offset=0){
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            try {
                return import('assets/mockdata/search_list.json').then(mod => Promise.resolve(mod.default.results));
            } catch (e) {
                console.log(e);
            }
        } else {
            let api_request = `${this.url}recipes/search?offset=${offset}&q=${query}`;
            try {
                return axios(this.getReqeustOption(api_request)).then(res => Promise.resolve(res.data.results))
            } catch (e) {
                console.log(e);
            }
        }
    }
}
