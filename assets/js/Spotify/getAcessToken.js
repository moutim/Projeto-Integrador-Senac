const btnRegistro = document.querySelector('#teste');
const btnLogin = document.querySelector('.btn-login-spotify');
const btnTeste = document.querySelector('.btn-teste');
const btnActive = document.querySelector('.btn-active');
const btnProfile = document.querySelector('.btn-profile');
const sectionLogin = document.querySelector('.section-login');
const sectionButtons = document.querySelector('.section-buttons');
const btn = document.querySelector('#acess');

const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
// const CLIENT_ID = '3b321dd51d7e4ee8875f06b7ed2347f5';
const CLIENT_SECRET = '2e18542402714a3dbdab9b3dd310afd3';
const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'http://127.0.0.1:5500/index.html';
const TOKEN = "https://accounts.spotify.com/api/token";

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
'&response_type=code';

const redirectAcess = (event) => {
    event.preventDefault();
    window.location.href = URL(scopesList.join());
    sessionStorage.setItem('acessToken', 'GAMBIARRA');
};

if (sessionStorage.getItem('acessToken')) {
    sectionLogin.innerHTML = '';
    sectionButtons.style.display = 'flex';
}

const getAcessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI('http://127.0.0.1:5500/index.html');
    body += "&client_id=" + CLIENT_ID;
    body += "&client_secret=" + CLIENT_SECRET;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;

    btnProfile.style.display = 'block';
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("acessToken", access_token);
            sessionStorage.setItem("acessToken", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
            sessionStorage.setItem("refresh_token", refresh_token);
        }
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

btnLogin.addEventListener('click', redirectAcess);
btnActive.addEventListener('click', getAcessToken);
btnProfile.addEventListener('click', () => window.location.href = 'profile.html');
