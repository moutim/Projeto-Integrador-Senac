const btnRegistro = document.querySelector('#teste');

const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'https://moutim.github.io/Projeto-Integrador-Senac/profile.html';

const scopesList = [
    'user-top-read',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-top-read',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-read-private',
    'user-read-recently-played'
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

