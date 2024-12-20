export { initGif };

const initGif = () => {
    const img = document.querySelector('.gif > img');
    const generateButton = document.querySelector('.gif > button');
    // todo: remove this
    const GIPHY_API_KEY = '';
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}`;

    function createEndpoint() {
        let search = document.querySelector('#gif-search').value;
        if (search === '') search = 'cats';
        return `${url}&s=${search}`;
    }

    function populateGif() {
        const url = createEndpoint();
        fetch(url, { mode: 'cors' })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                img.src = response.data.images.original.url;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function populateGifAsync() {
        const url = createEndpoint();
        const response = await fetch(url, { mode: 'cors' });
        const gifData = await response.json();
        img.src = gifData.data.images.original.url;
    }

    generateButton.addEventListener('click', () =>
        populateGifAsync().catch((error) => console.log(error))
    );
    populateGifAsync().catch((error) => console.log(error));

    // generateButton.addEventListener('click', () => populateGif());
    // populateGif();

    return { populateGif };
};
