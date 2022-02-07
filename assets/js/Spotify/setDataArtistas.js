const radioButtonsArtists = document.getElementsByName('time-range-artists');
const div50Artists = document.querySelector('.top50-artists');

const createDivTOPArtistas = (nome, url, contador) => {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('alt', nome);
    figcaption.innerText = `${contador} - ${nome}`;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    div50Artists.appendChild(figure);
}

const setTopArtists = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/artists${time}&limit=50`);
    // const arrayArtist = [];
    // data.items.forEach((item, index) => index <= 2 ? arrayArtist.push(item) : false);
    data.items.forEach((item, index) => {
        const contador = index + 1;
        const { name, images } = item;
        const { url } = images[0];
        createDivTOPArtistas(name, url, contador);
    })
}
setTopArtists();

const getTrackByTimeRange = (event) => {
    const time = event.target.value;
    div50Artists.innerText = '';
    setTopArtists(`?time_range=${time}`);
}
radioButtonsArtists.forEach((item) => item.addEventListener('change', getTrackByTimeRange));

const createAsideBackgroundArtists = async () => {
    const { items } = await fetchData('v1/me/top/artists?time_range=long_term&limit=30');
    items.forEach((item, index) => {
        const { images } = item;
        const { url } = images[0];
        if(index <= 15) { createImgAsideLeft(url); return };
        createImgAsideRight(url);
    })
}
createAsideBackgroundArtists();