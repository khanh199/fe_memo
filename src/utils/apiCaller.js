import axios from 'axios';
import * as Config from './../constants/Config';

const callAPI = (endpoint, method = 'GET', body) => {
    var token = document.cookie && document.cookie.split(';').find(n => n.includes('authorization')) ? document.cookie.split(';').find(n => n.includes('authorization')).split('=')[1] : '';
    var lang = document.cookie && document.cookie.split(';').find(n => n.includes('lang')) ? document.cookie.split(';').find(n => n.includes('lang')).split('=')[1] : 'vn';
    if (token !== '') {
        return axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            data: body,
            headers: {
                "authorization": `bearer ${token}`,
                "accept": "application/json",
                "language": lang
            }
        })
        .then(data => {
            if(data.data.tokensai){
                window.location.href = '/kentei/login'
            }else{
                return data;
            }
        })
        .catch(err => {
            console.log(err.err);
        });
    }else{
        window.location.href = '/kentei/login'
    }
}

export default callAPI;