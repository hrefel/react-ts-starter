import axios from "axios"

export default {
    getMovieList: async function(page: number, title :string = "batman" ) {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=${title}&page=${page}`);
            return response;
        } catch(e) {
            throw e;
        }
    }
}