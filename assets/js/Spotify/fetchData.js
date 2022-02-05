const headers = () => {
    const acessToken = localStorage.getItem('acessToken');
    return {
        headers: {
            'Authorization': `Bearer ${acessToken}`
        }
    };
};

const fetchData = async (endPoint, header = headers()) => {
    const url = `https://api.spotify.com/${endPoint}`;
    try{
        const response = await fetch(url, header);
        const data = await response.json();
        return data;
    } catch(erro){
        console.log(erro);
    }
}