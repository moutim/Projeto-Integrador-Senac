// import createDivTrack from "../script";

// Elementos necessarios
const displayName = document.querySelector('#nome-display');
const displaySeguidores = document.querySelector('#seguidores');
const displayPlaylists = document.querySelector('#numero-playlists')
const displayFoto = document.querySelector('#foto-display');
const displaySpotifyUrl = document.querySelector('#spotify-url');
const displayTotalPlaylists = document.querySelector('#numero-playlists');
const radioButtons = document.getElementsByName('time-range');
const listTracks = document.querySelector('.list-tracks');
const listArtists = document.querySelector('.list-artists');
const btn = document.querySelector('#play');

const setProfileInfo = async () => {
    const data = await fetchData('v1/me');
    const { display_name, followers: {total}, images, external_urls: { spotify } } = data;
    const { url } = images[0];
    displayName.innerText = display_name;
    displaySpotifyUrl.setAttribute('href', spotify);
    displaySeguidores.innerText = total;
    displayFoto.setAttribute('src', url);
}
// setProfileInfo();

const setTopMusics = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/tracks${time}`);
    const arrayMusic = [];
    data.items.forEach((item, index) => index <= 2 ? arrayMusic.push(item) : false );
    console.log(arrayMusic);
    arrayMusic.forEach((item) => {
        const { name, artists, album: {images} } = item;
        const { name: artistName } = artists[0];
        const { url } = images[0];
        createDivTrack(url, name, artistName);
    })
}
// setTopMusics();

const setTopArtists = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/artists${time}`);
    const arrayArtist = [];
    data.items.forEach((item, index) => index <= 2 ? arrayArtist.push(item) : false);
    arrayArtist.forEach((item) => {
        const { name, images } = item;
        const { url } = images[0];
        createDivArtist(url, name);
    })
}
// setTopArtists();

const setCurrencyPlaying = async () => {
    const data = await fetchData('v1/me/player/recently-played');
    const { items } = data;
    console.log(items);
    const { context, track: { id }} = items[2];
    console.log(context);
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
// setCurrencyPlaying();

const getInfoPlaylists = async () => {
    const data = await fetchData('v1/me/playlists?limit=50&offset=5');
    const { total } = data;
    console.log(data);
    displayTotalPlaylists.innerText = total;
}
// getInfoPlaylists();

const getTrackByTimeRange = (event) => {
    const time = event.target.value;
    listArtists.innerText = '';
    listTracks.innerText = '';
    setTopArtists(`?time_range=${time}`);
    setTopMusics(`?time_range=${time}`);
}
radioButtons.forEach((item) => item.addEventListener('change', getTrackByTimeRange));

btn.addEventListener('click', getInfoPlaylists);