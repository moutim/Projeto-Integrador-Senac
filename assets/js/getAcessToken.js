// const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
// const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
// const REDIRECT_URL = 'http://127.0.0.1:5500/index.html';

// const btnSpotifyLogin = document.querySelector('#teste');

// const acess = document.querySelector('#acess');

// const escopo = 'user-top-read';

// const getLoginURL = (scopes) => {
//     return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
//       '&redirect_uri=' + encodeURIComponent(REDIRECT_URL) +
//       '&scope=' + encodeURIComponent(scopes) +
//       '&response_type=token';
// }

// const url = 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
//       '&redirect_uri=' + encodeURIComponent(REDIRECT_URL) +
//       '&scope=' + encodeURIComponent(scopes) +
//       '&response_type=token';

// const askAuthorization = () => {
//     // window.location.href = (`${URL_ATHORIZATION}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&show_dialog=true`);
//     window.location.href = getLoginURL(escopo);
//     console.log('dddd');
// }

// const getAcessToken = () => {
//     const acessToken = location.hash.split('&')[0].split('=')[1];
//     localStorage.setItem('acessToken', acessToken);
//     console.log(acessToken);
//     return acessToken;
// };

// btnSpotifyLogin.addEventListener('click', () => {
//     console.log('doqdjqoidq');
//     window.location.href = url;
// });

// // acess.addEventListener('click', getAcessToken);






// const btnRegistro = document.querySelector('.btn-register');

// const CLIENT_ID = '58cba2a8bbb440fa89bb0f2c6d74dedc';
// const URL_ATHORIZATION = 'https://accounts.spotify.com/authorize';
// const REDIRECT_URL = 'http://127.0.0.1:5500/index.html';

// const scopesList = 'user-top-read';

// const URL = (scope) => 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
// '&redirect_uri=' + encodeURIComponent(REDIRECT_URL) +
// '&scope=' + encodeURIComponent(scope) +
// '&response_type=token';

// const redirectAcess = (event) => {
//     event.preventDefault();
//     window.location.href = URL(scopesList);
//     const acessToken = location.hash.split('&')[0].split('=')[1];
//     if (acessToken) {
//         window.location.href = 'register.html'
//     }
// };

// btnRegistro.addEventListener('click', redirectAcess);

