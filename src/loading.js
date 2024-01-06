export default class Loading {
    constructor() {

    }
    hidden(el) {
        el.classList.add('hidden');
    }
    visible(el) {
        el.classList.remove('hidden');
    }
}