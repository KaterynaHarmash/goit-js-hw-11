import Notiflix from "notiflix";
import { ImagesAPI } from "./images-api";
import Loading from "./loading";

const pixabayApi = new ImagesAPI();
const load = new Loading();

const form = document.querySelector('#search-form');
const galleryContainerRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

load.hidden(loadMoreBtn);

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', createGalleryMurkup);

function onSearchSubmit(event) {
    event.preventDefault();
    load.hidden(loadMoreBtn);

    changeSearchQuery(event.target.elements.searchQuery.value);
    pixabayApi.images = [];
    pixabayApi.resetPage();
    resetPageMarkup();
    
    createGalleryMurkup();
}
async function createGalleryMurkup() {
    Notiflix.Loading.dots('Loading');
    load.hidden(loadMoreBtn);
    pixabayApi.fetchImages().then(r => {
        if (r.totalHits === 0) {
            Notiflix.Loading.remove();
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        if (r.hits.length === 0) {
            Notiflix.Loading.remove();
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }
        const gallery = r.hits.map(image => {
            return `<div class="photo-card">
                        <img src="${image.previewURL}" alt="${image.tags}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b>
                            ${image.likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b>
                            ${image.views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>
                            ${image.comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>
                            ${image.downloads}
                            </p>
                        </div>
                    </div>`
        })
        addimageToMarkup(gallery);
        Notiflix.Loading.remove();
        load.visible(loadMoreBtn);
        // console.log(gallery);
    }
    ).catch(() => {
        return Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}
function addimageToMarkup(markupArr) {
    galleryContainerRef.insertAdjacentHTML('beforeend',markupArr.join(""));
}
function resetPageMarkup() {
    galleryContainerRef.innerHTML = '';
}
function changeSearchQuery(querytext) {
    const searchQuery = querytext;
    pixabayApi.query=searchQuery;
}