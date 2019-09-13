import axios from 'axios';

export default class RecipeAPI {
    constructor(url, key, host) {
        this.url = url;
        this.key = key;
        this.host = host;
    }

    //TODO: add another function to get recipe info
    async getRecipe(rid) {
        return id;
    }


    async search(query, offset=0){
        console.log(this.host);
        if (process.env.DEBUG === 'true' && process.env.MOCKDATA === 'true') {
            const data = await import('../../assets/mockdata/search_list.json');
            return data.results;
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
                console.log(e);
            }
        }
    }
}
