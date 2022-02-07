const displayName = document.querySelector('#nome-display');
const displaySeguidores = document.querySelector('#seguidores');
const displayFoto = document.querySelector('#foto-display');
const displayTotalPlaylists = document.querySelector('#numero-playlists');

const setProfileInfo = async () => {
    const data = await fetchData('v1/me');
    const { id, display_name, followers: {total}, images } = data;
    localStorage.setItem('user-id', id);
    const { url } = images[0];
    displayName.innerText = display_name;
    displaySeguidores.innerText = total;
    displayFoto.setAttribute('src', url);
}
setProfileInfo();

const getInfoPlaylists = async () => {
    const data = await fetchData('v1/me/playlists');
    const { total } = data;
    displayTotalPlaylists.innerText = total;
}
getInfoPlaylists();

window.onload = () => {
    const body = document.querySelector('body');
    const state = localStorage.getItem('dark-mode');
    if(state) { body.classList.add(state) }
}
