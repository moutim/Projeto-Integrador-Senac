const btnRegistro = document.querySelector('#teste');

const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
// const CLIENT_ID = '3b321dd51d7e4ee8875f06b7ed2347f5';
const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'http://127.0.0.1:5500/profile.html';

const scopesList = [
    'user-top-read',
    'user-read-recently-played',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-top-read',
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'playlist-read-collaborative',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public'
];

const URL = (scope) => 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
'&redirect_uri=' + encodeURIComponent(REDIRECT_URL) +
'&scope=' + encodeURIComponent(scope) +
'&response_type=token';

const redirectAcess = (event) => {
    event.preventDefault();
    window.location.href = URL(scopesList.join());
};

const acessToken = location.hash.split('&')[0].split('=')[1];
localStorage.setItem('acessToken', acessToken);

btnRegistro.addEventListener('click', redirectAcess);

