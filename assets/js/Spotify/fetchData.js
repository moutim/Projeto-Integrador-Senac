const headers = () => {
    const acessToken = localStorage.getItem('acessToken');
    return {
        headers: {
            'Authorization': `Bearer ${acessToken}`
        }
    };
};

const fetchData = async (endPoint) => {
    const url = `https://api.spotify.com/${endPoint}`;
    try{
        const response = await fetch(url, headers());
        const data = await response.json();
        return data;
    } catch(erro){
        console.log(erro);
    }
}