import React , {useState,useEffect} from 'react';
import './css/login.css';
import "./css/spinner.css";
import { useHistory } from 'react-router-dom';
import { RegisterForm } from './Logics/Validation';
import {API,API_KEY} from './API/Api';
import axios from "axios";
import {CheckLoginStatus} from './Logics/CheckLoginStatus';
import Cookies from 'universal-cookie';
import {Encoding} from './Logics/Encoding';

const Register = () => {
    const history = useHistory();
    const cookies = new Cookies();
    const [username,setUsername] = useState("");
    const [useremail,setUseremail] = useState("");
    const [usermobile,setUsermobile] = useState("");
    const [userpassword,setUserpassword] = useState();
    const [display,setDisplay] = useState("none");
    const [isRegister,setIsRegister] = useState("");
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



    const RegisterUser = () => {
        setProcessDisplay("block");
        const valid = RegisterForm(username,useremail,usermobile,userpassword);
        if(valid === false){
            setProcessDisplay("none");
            return false;
        } 
        axios.post(`${API}/API/SaveUser`,{
            API_KEY : API_KEY,
            username : valid.username,
            useremail : valid.useremail,
            usermobile : valid.usermobile,
            userpassword : valid.userpassword
        }).then((response) => {
            if(response.data.error === true){
                if(response.data.errorType === 'API_KEY'){
                    setProcessDisplay("none");
                    alert("Registeration error!");
                    console.error("\n\n You have entered a wrong API Key.");
                    return false;
                }
                if(response.data.errorType === 'query_error'){
                    if(response.data.errorNumber === 1062){
                        setErrorMessage(`User already exists for email id "${valid.useremail}". Please use a different email ID.`);
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                            setErrorMessage("");
                        },5000);
                        return false;
                    }else{
                        setErrorMessage(`Something Went Wrong! Please try again.`);
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                            setErrorMessage("");
                        },5000);
                        return false;
                    }
                }else{
                    setErrorMessage(`Something Went Wrong! Please try again...`);
                        setProcessDisplay("none");
                        setErrorDisplay("block");
                        setTimeout(()=>{
                            setErrorDisplay("none");
                            setErrorMessage("");
                        },5000);
                        return false;
                }
            }
            else if(response.data.error === false){
                setProcessDisplay("none");
                setDisplay("block");
                setIsRegister("Registeration Successful");
                setTimeout(()=>{
                    history.push("/Login");
                },3000);
            }
            else{
                setErrorMessage(`Something Went Wrong !! Please try again...`);
                setProcessDisplay("none");
                setErrorDisplay("block");
                setTimeout(()=>{
                    setErrorDisplay("none");
                    setErrorMessage("");
                },5000);
                return false;
            }
        }).catch((error) => {
            alert("There is an error in registeration : " + error);
            setProcessDisplay("none");
        });
    } 

    return (
        <> 
            <div className="black_bg" style={{"display" : display}}>
                <div className="for-success">
                    <img src="./media/gif/check.png" alt="Successfully-register" className="success-img" />
                </div>
                <h6 className='register-successful'>
                    {isRegister}
                </h6>
                <div className='for-loading spinner spinner-2'></div>
            </div>
            <div className="for-alert-messages"  style={{"display" : errorDisplay}}>
                {errorMessage}
            </div>
            <div className="process-display" style={{"display" : processDisplay}}>
                <div className="spinner spinner-1"></div>
            </div>
            {/* main code start from here */}
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
                    <h3 className='login-heading'>Register in ChatRoom</h3>
                    <div className="for-form">
                        <input type="text" required onChange={(e)=> setUsername(e.target.value) } className='input-1'  placeholder='Full Name' />
                        <input type="email" required onChange={(e)=> setUseremail(e.target.value) } className='input-1'  placeholder='Username@gmail.com' />
                        <input type="text" required onChange={(e)=> setUsermobile(e.target.value) } className='input-1'  placeholder='Mobile Number' />
                        <input type="text" required onChange={(e)=> setUserpassword(e.target.value) } className='input-1'  placeholder='Password' />
                        <button onClick={()=>RegisterUser()} className='btn btn-login'>Register</button>
                    </div>
                    <span className="no-account">Already have account?<span className='register-btn'  onClick={()=>history.push("/Login")}> Login</span></span>
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

export default Register;