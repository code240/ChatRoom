import Cookies from 'universal-cookie';
import axios from 'axios';
import { API, API_KEY } from '../API/Api';
import {Decoding} from './Encoding';

const CheckLoginStatus = () => {
    const cookies = new Cookies();
    const user = Decoding(cookies.get('chatroom_uid'));
    if(user === undefined){
        return false;
    }else{
        const x = axios.post(`${API}/API/ConfirmUser`,{
            API_KEY : API_KEY,
            useremail : user
        }).then((response) => {
            if(response.data.error === true){
                console.error("Somthing went wrong");
                cookies.remove('chatroom_uid', { path: '/' });
                return response.data;
            }else{
                return response.data;
            }
        }).catch((error) => {
            console.log("Error"+error);
            cookies.remove('chatroom_uid', { path: '/' });
            return {error: true, userLogin : false}
        })
        return x;
    }
}

export {CheckLoginStatus};