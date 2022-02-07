// import createDivTrack from "../script";

// Elementos necessarios

const displayPlaylists = document.querySelector('#numero-playlists')
const radioButtons = document.getElementsByName('time-range');
const btnCreatePlaylist = document.querySelector('.btn-create-playlist');
const listTracks = document.querySelector('.list-tracks');
const listArtists = document.querySelector('.list-artists');
const profileCover = document.querySelector('.container-pic');
// const btn = document.querySelector('#play');

// Header para POST
const header = (time) => {
    const acessToken = localStorage.getItem('acessToken');
    const headerPOST = {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${acessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": `Top 50 músicas - ${time}`,
            "description": "Playlist criada com base na suas músicas mais escutadas - Desenvolvido por Vitor Moutim",
            "public": true
        })
    }
    return headerPOST;
}

const setTopMusics = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/tracks${time}`);
    const arrayMusic = [];
    data.items.forEach((item, index) => index <= 2 ? arrayMusic.push(item) : false );
    arrayMusic.forEach((item, index) => {
        const contador = index + 1;
        const { name, artists, album: {images} } = item;
        const { name: artistName } = artists[0];
        const { url } = images[0];
        createDivTrack(url, name, artistName, contador);
    })
}
setTopMusics();

const setTopArtists = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/artists${time}`);
    const arrayArtist = [];
    data.items.forEach((item, index) => index <= 2 ? arrayArtist.push(item) : false);
    arrayArtist.forEach((item, index) => {
        const contador = index + 1;
        const { name, images } = item;
        const { url } = images[0];
        createDivArtist(url, name, contador);
    })
}
setTopArtists();

const setCurrencyPlaying = async () => {
    const data = await fetchData('v1/me/player/recently-played');
    const { items } = data;
    const { context, track: { id }} = items[2];
    if (context === null) {
        createIframeMusic(id, 'track');
        return;
    }
    const { type, uri } = context;
    if (type === 'artist') {
        const idArtist = uri.split(':')[2];
        createIframeMusic(idArtist, 'artist');
    } else if (type === 'playlist') {
        const idPlaylist = uri.split(':')[2];
        createIframeMusic(idPlaylist, 'playlist')
    }
}
setCurrencyPlaying();

const getTrackByTimeRange = (event) => {
    const time = event.target.value;
    listArtists.innerText = '';
    listTracks.innerText = '';
    setTopArtists(`?time_range=${time}`);
    setTopMusics(`?time_range=${time}`);
}
radioButtons.forEach((item) => item.addEventListener('change', getTrackByTimeRange));

const createPlaylist = async () => {
    const userid = localStorage.getItem('user-id');
    const time = document.querySelector('input[name="time-playlist"]:checked').value;
    let titlePlaylist;
    if (time === 'short_term') titlePlaylist = 'Mês';
    if (time === 'medium_term') titlePlaylist = '6 Meses';
    if (time === 'long_term') titlePlaylist = 'Desde o início';
    const { id } = await fetchData(`v1/users/${userid}/playlists`, header(titlePlaylist));
    const { items } = await fetchData(`v1/me/top/tracks?time_range=${time}&limit=50`);
    const musics = items.map((item) => item.uri);
    await fetchData(`v1/playlists/${ id }/tracks?uris=${encodeURIComponent(musics.join())}`, header());
    createIframePlaylist( id );
}

const createAsideBackground = async () => {
    const { items } = await fetchData('v1/me/top/artists?time_range=long_term&limit=18');
    items.forEach((item, index) => {
        const { images } = item;
        const { url } = images[0];
        if(index <= 8) { createImgAsideLeft(url); return };
        createImgAsideRight(url);
    })
}
createAsideBackground();
btnCreatePlaylist.addEventListener('click', createPlaylist);

// btn.addEventListener('click', testando)