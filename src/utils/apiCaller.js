import axios from 'axios';
import * as Config from './../constants/config';

const callAPI = (endpoint, method = 'GET', body) => {
    var token = localStorage.getItem('memo-token')
    if (token !== '') {
        return axios({
            method: method,
            url: `${Config.URL_API}/${endpoint}`,
            data: body,
            headers: {
                "authorization": `bearer ${token}`,
                "accept": "application/json",
            }
        })
        .then(data => {
            if(data.data.tokensai){
                window.location.href = '/login'
            }else{
                return data;
            }
        })
        .catch(err => {
            console.log(err.err);
        });
    }else{
        window.location.href = '/login'
    }
}

export default callAPI;