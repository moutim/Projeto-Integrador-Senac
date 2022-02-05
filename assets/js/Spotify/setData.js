// import createDivTrack from "../script";

// Elementos necessarios
const displayName = document.querySelector('#nome-display');
const displaySeguidores = document.querySelector('#seguidores');
const displayPlaylists = document.querySelector('#numero-playlists')
const displayFoto = document.querySelector('#foto-display');
const displaySpotifyUrl = document.querySelector('#spotify-url');
const displayTotalPlaylists = document.querySelector('#numero-playlists');
const radioButtons = document.getElementsByName('time-range');
const btnCreatePlaylist = document.querySelector('btn-create-playlist');
const listTracks = document.querySelector('.list-tracks');
const listArtists = document.querySelector('.list-artists');
const profileCover = document.querySelector('.container-pic');
const btn = document.querySelector('#play');

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

const setProfileInfo = async () => {
    const data = await fetchData('v1/me');
    const { id, display_name, followers: {total}, images, external_urls: { spotify } } = data;
    localStorage.setItem('user-id', id);
    const { url } = images[0];
    displayName.innerText = display_name;
    displaySpotifyUrl.setAttribute('href', spotify);
    displaySeguidores.innerText = total;
    displayFoto.setAttribute('src', url);
}
setProfileInfo();

const setTopMusics = async (time = '?time_range=medium_term') => {
    const data = await fetchData(`v1/me/top/tracks${time}`);
    const arrayMusic = [];
    data.items.forEach((item, index) => index <= 2 ? arrayMusic.push(item) : false );
    arrayMusic.forEach((item) => {
        const { name, artists, album: {images} } = item;
        const { name: artistName } = artists[0];
        const { url } = images[0];
        createDivTrack(url, name, artistName);
    })
}
setTopMusics();

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

const getInfoPlaylists = async () => {
    const data = await fetchData('v1/me/playlists?limit=50&offset=5');
    const { total } = data;
    displayTotalPlaylists.innerText = total;
}
getInfoPlaylists();

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
    console.log(musics);
    await fetchData(`v1/playlists/${ id }/tracks?uris=${encodeURIComponent(musics.join())}`, header());
    createIframePlaylist( id );
}

const teste = async () => {
    const data = await fetchData('v1/users/hugoxavier12');
    console.log(data);
}

btn.addEventListener('click', createPlaylist);