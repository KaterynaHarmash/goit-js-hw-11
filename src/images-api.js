import axios from "axios";

const BASEURL = 'https://pixabay.com/api/';
const APIKEY = '8561427-28425017e1b4cf528f7525243';
export class ImagesAPI {
    constructor() {
        this.query = '',
        this.page = 1,
        this.images = [] 
    }

    async fetchImages() {
        try {
            const response = await axios.get(`${BASEURL}?key=${APIKEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
            this.incrementPage();
            return response.data;

        } catch (error) {
            return error;
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
}