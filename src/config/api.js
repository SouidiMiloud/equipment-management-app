function fetchData(url, requestMethod, requestBody){

    const info = {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        method: requestMethod
    }
    if(requestBody !== '')
        info.body = JSON.stringify(requestBody);

    return fetch(`http://localhost:8090${url}`, info)
    .then(response=>{
        if(response.status === 200){
            const dataType = response.headers.get('content-type');
            if(dataType && dataType.includes('application/json'))
                return response.json();
            return response.text();
        }
    })
};
export default fetchData;