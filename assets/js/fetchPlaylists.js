const btn = document.querySelector('#play');

const headers = () => {
    const acessToken = localStorage.getItem('acessToken');
    return {
        headers: {
            'Authorization': `Bearer ${acessToken}`
        }
    };
};

const fetchPlaylist = async () => {
    const url = 'https://api.spotify.com/v1/me/top/tracks';
    try{
        const response = await fetch(url, headers());
        const data = await response.json();
        console.log(data);
    } catch(erro){
        console.log(erro);
    }
}

btn.addEventListener('click', fetchPlaylist)