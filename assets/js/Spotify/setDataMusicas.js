const radioButtonsMusics = document.getElementsByName('time-range-tracks');
const div50Musics = document.querySelector('.top50-tracks');

function createDivTOPTrack(url, nome, artista, contador) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const figcaption2 = document.createElement('figcaption');
    img.setAttribute('src', url);
    img.setAttribute('alt', `Capa da musica ${nome} - ${artista}`);
    figcaption.innerText = `${contador} - ${nome}`;
    figcaption.classList.add('music-name');
    figcaption2.classList.add('artist-name');
    figcaption2.innerText = artista;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(figcaption2);
    div50Musics.appendChild(figure);
}

const createDivTOPMusics = (nome, url, contador) => {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('alt', nome);
    figcaption.innerText = `${contador} - ${nome}`;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    div50Musics.appendChild(figure);
}

const setTopMusics = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/tracks${time}&limit=50`);
    data.items.forEach((item, index) => {
        const contador = index + 1;
        const { name, artists, album: {images} } = item;
        const { name: artistName } = artists[0];
        const { url } = images[0];
        createDivTOPTrack(url, name, artistName, contador);
    })
}
setTopMusics();

const getTrackByTimeRange = (event) => {
    const time = event.target.value;
    div50Musics.innerText = '';
    setTopMusics(`?time_range=${time}`);
}
radioButtonsMusics.forEach((item) => item.addEventListener('change', getTrackByTimeRange));

const createAsideBackgroundMusics = async () => {
    const { items } = await fetchData('v1/me/top/artists?time_range=long_term&limit=30');
    items.forEach((item, index) => {
        const { images } = item;
        const { url } = images[0];
        if(index <= 15) { createImgAsideLeft(url); return };
        createImgAsideRight(url);
    })
    console.log(items);
}
createAsideBackgroundMusics();