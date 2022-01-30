const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'http://127.0.0.1:5500/index.html';

const btnSpotifyLogin = document.querySelector('#teste');

const askAuthorization = () => {
    window.location.href = (`${URL_ATHORIZATION}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&show_dialog=true`);
    console.log('dddd');
}

const getAcessToken = () => {
    const acessToken = location.hash.split('&')[0].split('=')[1];
    console.log(acessToken);
    return acessToken;
};

btnSpotifyLogin.addEventListener('click', getAcessToken)

