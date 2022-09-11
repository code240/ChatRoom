import React, { useState ,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {API,API_KEY} from "./API/Api";
import { LoginForm } from './Logics/Validation';
import {CheckLoginStatus} from './Logics/CheckLoginStatus';
import './css/login.css';
import Cookies from 'universal-cookie';
import {Encoding} from './Logics/Encoding';


const Login = () => {
    const history = useHistory();
    const cookies = new Cookies();
    const [useremail,setUseremail] = useState("");
    const [userpassword,setUserpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorDisplay,setErrorDisplay] = useState("none");
    const [processDisplay,setProcessDisplay] =useState("none");


    useEffect(()=>{
        const response = CheckLoginStatus();
            if(response !== false){
                response.then((res) => {
                    if(res.userLogin === true){
                        cookies.set('chatroom_uid', Encoding(res.userCode), { path: '/', expires: new Date(Date.now()+((1000)*(60*60*24*30)))});
                        history.push("/Home");
                    }
                })
        }
    });

    const authenticate = () => {
        setProcessDisplay("block");
        const valid = LoginForm(useremail,userpassword);
        if(valid === false){
            setProcessDisplay("none");
            return false;
        }

        axios.post(`${API}/API/Authentication/Login`,{
            API_KEY : API_KEY,
            useremail : valid.useremail,
            userpassword : valid.userpassword
        }).then((response) => {
            if(response.data.error === true){
                if(response.data.errorType === 'API_KEY'){
                    alert("Something went wrong. You are not eligible for login.");
                    console.error("\n\n You have entered a wrong API Key.");
                    setProcessDisplay("none");
                    return false; 
                }else{
                    setErrorMessage("Something went wrong! Please try again.");
                    setErrorDisplay("block");
                    setProcessDisplay("none");
                    setTimeout(()=>{
                        setErrorDisplay("none");
                    },5000)
                    return false;
                }
            }else{
                if(response.data.loginStatus === true){
                    // Condition When Login Success    
                    const uid = response.data.AuthenticateUser;
                    cookies.set('chatroom_uid', Encoding(uid), { path: '/', expires: new Date(Date.now()+((1000)*(60*60*24*30)))});
                    history.push("/Home");
                    setProcessDisplay("none");
                }else{
                    if(response.data.Reason === 'Useremail'){
                        setErrorMessage("The email address you entered isn't connected to an account.");
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                        },7000)
                        return false;
                    }
                    else if(response.data.Reason === 'Password'){
                        setErrorMessage("The password that you've entered is incorrect.");
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                        },7000)
                        return false;
                    }else{
                        setErrorMessage("Invalid Credentials.");
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                        },7000)
                        return false;
                    }
                }
            }
        }).catch((error) => {
            setProcessDisplay("none");
            alert("There is an error while login (Try again): " + error);
        })
    }

    return (
        <>

            <div className="for-alert-messages"  style={{"display" : errorDisplay}}>
                {errorMessage}
            </div>
            <div className="process-display" style={{"display" : processDisplay}}>
                <div className="spinner spinner-1"></div>
            </div>
            <header className='header'>
                <span className='brandname'>
                    {/* <span className='comment-logo'><i class="fa-solid fa-comment"></i></span>  */}
                    <span className='firstletter'></span>Chat<span className="midletter"></span>Room 
                    
                </span>
            </header>

            <div className='main-wrap'>
                <span className="main-text">
                    ChatRoom helps you connect and share with the people in your life.
                </span>
                <button className='btn btn-mailbox btn-mailbox-1' onClick={()=>alert("Currently, This service is not available!")}>Login with mailBox</button>
                <div className='leftside'>
                    <img src="./media/img5.jpg" alt="chatroom" className='img-chatroom' />
                </div>
                <div className="rightside">
                    <button className='btn btn-mailbox btn-mailbox-2' onClick={()=>alert("Currently, This service is not available!")}>Login with mailBox</button>
                    <hr className='line' />
                    <h3 className='login-heading'>Login via ChatRoom</h3>
                    <div className="for-form">
                        <input type="text" onChange={(e)=>setUseremail(e.target.value)} className='first-input input-1' placeholder='Username@gmail.com' />
                        <input type="password" onChange={(e)=>setUserpassword(e.target.value)} className='input-1' placeholder='Password' />
                        <button className='btn btn-login' onClick={()=>authenticate()}>Login</button>
                    </div>
                    <span className="no-account">Don't have any account?<span className='register-btn' onClick={()=>history.push("/Register")}> Register</span></span>
                </div>
                <div className="cb"></div>
            </div>
            <span className='last-text'>
                &#169; ChatRoom - 2022 <br/>
                Created by Vipin
            </span>
        </>
    )
}

export default Login;