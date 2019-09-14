import axios from 'axios';

export default class RecipeAPI {
    constructor(url, key, host) {
        this.url = url;
        this.key = key;
        this.host = host;
    }

    getRequestOption(request) {
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
                const mod = await import('assets/mockdata/recipe_info.json');
                return mod.default;
            } catch (e) {
                console.log(e);
            }
        } else {
            let api_request = `${this.url}recipes/${rid}/information`;
            try {
                const res = await axios(this.getRequestOption(api_request));
                return res.data
            } catch (e) {
                console.log(e);
            }
        }
    }


    async search(query, offset=0){
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            try {
                const mod = await import('assets/mockdata/search_list.json');
                console.log(mod);
                return mod.default.results;
            } catch (e) {
                console.log(e);
            }
        } else {
            let api_request = `${this.url}recipes/search?offset=${offset}&q=${query}`;
            try {
                const res = await axios(this.getRequestOption(api_request));
                return res.data.results
            } catch (e) {
                console.log(e);
            }
        }
    }

    doTest() {
        const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
        console.log('before promise');
        return delay(1000)
    }

}
