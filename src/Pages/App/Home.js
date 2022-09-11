import React,{useState,useEffect} from 'react';
import {CheckLoginStatus} from './../Logics/CheckLoginStatus';
import { useHistory } from 'react-router-dom';
import "./app_css/home.css";
import "./app_css/AddRoom.css";
import Rooms from './AppComponent/Rooms';
import axios from 'axios';
import { API, API_KEY } from '../API/Api';
import { Decoding } from '../Logics/Encoding';
import Cookies from 'universal-cookie';
import AvtarsData from './StaticData/AvtarsData';


const Home = () => {
  const history = useHistory();
  const cookies = new Cookies();
  const [isOk,setIsOk] = useState(false);
  const [roomExist,setRoomExist] = useState("flex");
  const [roomNotExist,setRoomNotExist] = useState("none");
  const [callRoomCount,setCallRoomCount] = useState(0);

  const [myRooms,setMyRooms] = useState([]);

  useEffect(()=>{
    
    const response = CheckLoginStatus();
      if(response === false){
        history.push("/");
      }else{
        response.then((res) => {
          if(res.error === true){
            history.push("/");
          }else{
            setIsOk(true);
          }
        })
      } 
  },[isOk]); 

  const logout = () => {
    cookies.remove("chatroom_uid");
    window.location.reload(false); 
  }

  // Fetch Rooms info

  useEffect(() => {
    axios.post(`${API}/API/GetRooms`,{
      API_KEY : API_KEY,
      uid : Decoding(cookies.get("chatroom_uid"))
    }).then((response) => {
      if(response.data.error === true){
        alert("Something went wrong!");
        return false;
      }else{
        if(response.data.success === true){
          setRoomExist("flex");
          setMyRooms(response.data.RoomData);
          if(callRoomCount > 1){
            if(myRooms.length === 0){
              setRoomNotExist("block")
              setRoomExist("none");
            }else{
              setRoomNotExist("none")
              setRoomExist("flex");
            }
          }
        }
      }
    }).catch((error) => {
      console.log("Data Fetching error...");
      console.log(error);
      setRoomNotExist("none")
      setRoomExist("flex");
    })

    setTimeout(() => {
      setCallRoomCount(callRoomCount+1);
    },1000)
  },[callRoomCount])

  

  if(!isOk){
    return(
      <>
        <div className="process-display">
          <div className="spinner spinner-1"></div>
        </div>
      </>
    )
  }

  

  return (
    <>
        <div className='main-body'>
          <header className='header-1'>
            <h1 className='brandname-1'>
              chatroom
            </h1>
          </header>
          <div className="buttons-div">
            <div className="nav-btn left-button active">Rooms</div>
            <div className="nav-btn left-button mid-button" onClick={()=>history.push("/AddRoom")}>Add new</div>
            <div className="nav-btn right-button">Profile</div>
            <div className="cb"></div>
          </div>

          
          <div className="main-for-rooms"  style={{"display" : roomExist}}>
            {myRooms.map((item,index) => {
              // console.log(AvtarsData[parseInt(item.roomavtar)].avtarSource);
              return(
                <Rooms key={index} roomid={item.roomid} imgName={AvtarsData[parseInt(item.roomavtar)-1].avtarSource} roomName={item.roomname} maxMember={item.memberCount} currentMember={item.members.split(",").length - 1} />
              )
            })}
          </div>
            
          <div className='if-no-room' style={{"display" : roomNotExist}}>
          <hr className='hr-line1' />
            <h6 className='if-no-room-heading'>
              You dont have any room to chat.
            </h6>
            <h6 className='get-room-heading'>
              Create a room or join an existing group.
            </h6>
            <button className='getRoom-btn' onClick={()=>history.push("/AddRoom")}>Add a room</button>
            <hr className='hr-line1' />
          </div>

          <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
    </>
  )
}

export default Home;