export { initGif };

const initGif = () => {
    // todo: remove this
    const GIPHY_API_KEY = '';
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=cats`;

    function populateGif() {
        const img = document.querySelector('.gif > img');

        fetch(url, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            img.src = response.data.images.original.url;
        });
    }

    const generateButton = document.querySelector('.gif > button');
    generateButton.addEventListener('click', () => populateGif());

    return { populateGif };
};
