const trackSection = document.querySelector('.list-tracks');
const listenSection = document.querySelector('#current-track');
const artistSection = document.querySelector('.list-artists');

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