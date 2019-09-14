import axios from 'axios';

export default class RecipeAPI {
    constructor(url, key, host) {
        this.url = url;
        this.key = key;
        this.host = host;
    }

    async getRecipe(rid) {
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            const data = await import('../../assets/mockdata/recipe_info.json');
            return data.results;
        } else {
            let api_request;
            api_request = `${this.url}recipes/${rid}/information`;
            console.log(api_request);
            try {
                const ret = await axios({
                    method: 'get',
                    url: api_request,
                    headers: {
                        'x-rapidapi-host': this.host,
                        'x-rapidapi-key': this.key
                    }});
                return ret.data.result;
            } catch (e) {
                console.log(e);
            }
        }
    }


    async search(query, offset=0){
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            try {
                const data = Promise.resolve('dummy');
                // const data = await import('../../assets/mockdata/search_list.json');
                console.log(data);
                return data.results;
            } catch (e) {
                console.log(e);
            }
        } else {
            let api_request;
            api_request = `${this.url}recipes/search?offset=${offset}&q=${query}`;
            console.log(api_request);
            try {
                const ret = await axios({
                    method: 'get',
                    url: api_request,
                    headers: {
                        'x-rapidapi-host': this.host,
                        'x-rapidapi-key': this.key
                    }});
                return ret.data.result;
            } catch (e) {
                console.log('really?');
                console.log(e);
            }
        }
    }
}
