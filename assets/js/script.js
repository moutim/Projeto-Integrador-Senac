// Ativando menu hamburguer do Materialize
$(document).ready(function(){
    $('.sidenav').sidenav();
});

// Pegando elementos
const trackSection = document.querySelector('.list-tracks');
const listenSection = document.querySelector('#current-track');
const artistSection = document.querySelector('.list-artists');
const firstAside = document.querySelector('.firstAside');
const secondAside = document.querySelector('.secondAside');
const body = document.querySelector('body');
const btnDark = document.querySelector('.button-dark');
const playlistSection = document.querySelector('.playlist-section');
// ---------------

btnDark.addEventListener('click', () => body.classList.toggle('dark-mode'));

function createDivTrack(url, nome, artista) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const figcaption2 = document.createElement('figcaption');
    img.setAttribute('src', url);
    img.setAttribute('alt', `Capa da musica ${nome} - ${artista}`);
    figcaption.innerText = nome;
    figcaption2.innerText = artista;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(figcaption2);
    trackSection.appendChild(figure);
}

function createDivArtist(url, artista) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    img.setAttribute('src', url);
    img.setAttribute('alt', `${artista} na foto`);
    figcaption.innerText = artista;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    artistSection.appendChild(figure);
}

function createIframeMusic(id, type) {
    const iFrame = `<iframe src="https://open.spotify.com/embed/${type}/${id}?utm_source=generator" width="100%" height="250" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    listenSection.innerHTML = iFrame;
}

function createIframePlaylist(id) {
    const iFrame = `<iframe src="https://open.spotify.com/embed/playlist/${id}?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    playlistSection.innerHTML = iFrame;
}

function createImgAsideLeft (url) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    firstAside.appendChild(img);
}

function createImgAsideRight (url) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', url)
    secondAside.appendChild(img);
}
