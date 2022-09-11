import React,{useEffect, useState} from 'react';
import {CheckLoginStatus} from './../Logics/CheckLoginStatus';
import { useHistory } from 'react-router-dom';
import "./app_css/home.css";
import Avtar from './AppComponent/Avtar';
import AvtarData from "./StaticData/AvtarsData";
import axios from 'axios';
import { API, API_KEY } from '../API/Api';
import { Decoding } from '../Logics/Encoding';
import Cookies from 'universal-cookie';


const AddRoom = () => {
  const history = useHistory();
  const [isOk,setIsOk] = useState(false);
  const [processDisplay,setProcessDisplay] =useState("none");
  const [roombtns,setRoombtns] = useState("block");
  const [roomForm,setRoomForm] = useState("none")
  const [roomForm2,setRoomForm2] = useState("none")
  const [roomForm3,setRoomForm3] = useState("none")
  const [prevBorder,setPrevBorder] = useState("first");
  const [isAvtar,setIsAvtar] = useState(false);
  const [roomId,setRoomId] = useState("");
  const [roomIdForJoin,setRoomIdForJoin] = useState("");

  // form data is here
  const [avtar,setAvtar] = useState("14");
  const [roomName,setRoomName] = useState("");
  const [memberCount,setMemberCount] = useState("2");
  
  const cookies = new Cookies();

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
  }); 

  if(!isOk){
    return(
      <>
        <div className="process-display">
          <div className="spinner spinner-1"></div>
        </div>
      </>
    )
  }



  const JoinExistingRoom = () => {
    setProcessDisplay("block");
    if(roomIdForJoin.trim().length !== 4){
      setProcessDisplay("none");
      alert("Invalid room id !");
      return false;
    }
    let uid = Decoding(cookies.get("chatroom_uid"));
    axios.post(`${API}/API/JoinRoom`,{
      API_KEY : API_KEY,
      uid : uid,
      roomId : roomIdForJoin
    }).then((response) => {
      if(response.data.error === true){
        setProcessDisplay("none");
        alert("Something went wrong..");
        return false;
      }else{
        if(response.data.success === false){
          if(response.data.Reason === "NoRoom"){
            setProcessDisplay("none");
            alert("Room id Doesn't exist!");
          }
          if(response.data.Reason === "NoSpaceInRoom"){
            setProcessDisplay("none");
            alert("The chat room has already reached the maximum number of members.");
          }
          if(response.data.Reason === 'YouAlreadyExist'){
            setProcessDisplay("none");
            alert("You are already in the room.")
          }
        }else{
          setProcessDisplay("none");
          alert("Room joined Successfully");
          history.push("/");
        }

        
      }
    }).catch((error) => {
      setProcessDisplay("none");
      console.log(error);
      alert("Network error : " + error)
    })
    // console.log(roomIdForJoin);
  }


  // Display create room part 
  const createRoom = () =>  {
    setRoombtns("none");
    setRoomForm("block");
  }
  // Display avtars part
  const selectAvtar = (x) => {
    document.getElementById(prevBorder).style.border = "0px";
    document.getElementById(x).style.border = "5px solid red";
    setPrevBorder(x);
    setAvtar(x);
    setIsAvtar(true);
  }
  const saveAvtar = () => {
    if(isAvtar){
      setRoomForm2("block");
      setRoomForm("none")
    }else{
      alert("Please select an avtar to proceed!");
    }
  }

  // Save Room 
  const SaveRoom = () => {
    setProcessDisplay("block");
    if(roomName.trim().length < 3 || roomName.trim().length > 25){
      setProcessDisplay("none");
      alert("Room name must be between 3 to 25 characters long.");
      return false;
    }
    const uid = Decoding(cookies.get('chatroom_uid'));
    axios.post(`${API}/API/CreateRoom`,{
      API_KEY : API_KEY,
      RoomAvtar : avtar,
      RoomMember : memberCount,
      RoomName : roomName,
      uid : uid
    }).then((response) => {
      if(response.data.error === true){
        setProcessDisplay("none");
        console.error("Something went wrong while creating your room...Please try again");
        alert("Something went wrong while creating your room...Please try again");
        return false;
      }
      if(response.data.error === false){
        setProcessDisplay("none");
        setRoomId(response.data.roomId);
        setRoomForm2("none");
        setRoomForm3("block");
      }
    }).catch((error) => {
      setProcessDisplay("none");
      alert("Error : " + error);
    })

  }
  return (
    <>
        <div className="process-display" style={{"display" : processDisplay}}>
          <div className="spinner spinner-1"></div>
        </div>
        <div className='main-body'>
          <div className="main-frame">
            <header className='header-1'>
              <h1 className='brandname-1'>
                chatroom
              </h1>
            </header>
            <div className="buttons-div">
              <div className="nav-btn left-button" onClick={()=>history.push("/Home")}>Rooms</div>
              <div className="nav-btn left-button mid-button active">Add new</div>
              <div className="nav-btn right-button">Profile</div>
            </div>
            
            
            <div className="add-new-div" style={{"display" : roombtns}}>
                <button className="btn btn-create-room" onClick={createRoom}>Create a room</button>
                <h6 className='or-heading'>Or</h6>
                <input type="text" name="roomid" autoComplete='off' onChange={(e) => setRoomIdForJoin(e.target.value)} placeholder='Enter room id' className='form-control input-room-id' />
                <button className="btn btn-join-room" onClick={JoinExistingRoom}>Join Room</button>
            </div>

            {/* Room form 1 for avtar */}
            <div className="room-form" style={{"display" : roomForm}}>
              <span className='avtar-heading'>Select an avtar for room icon.</span>
              {/* avtars row  */}
              <div className="main-for-avtar">
                {AvtarData.map((item,index)=>{
                  return (
                    <Avtar onTapFun={selectAvtar} key={index} img={item.avtarSource} avtarCode={item.avtarCode}  />
                  )
                })}
                <div className="cb"></div>
              </div>
              {/* avtars row over */}
              <button className='btn-next' onClick={saveAvtar}>Next</button>
            </div>

            {/* Room Form 2 */}
            <div className="ask-room-info-main" style={{"display" : roomForm2}}>
                <h6 className='ask-roomname'>
                  Enter the room name :
                </h6>
                <input type="text" onChange={(e) => setRoomName(e.target.value)} className='form-control input-roomname' placeholder='Enter room name' />
                <h6 className="ask-max-members">
                  Maximum members can be :
                </h6>
                <select name="member"  onChange={(e) => setMemberCount(e.target.value)} className='form-control input-roomname'>
                  <option value="2">2 Member</option>
                  <option value="3">3 Member</option>
                  <option value="4">4 Member</option>
                  <option value="5">5 Member</option>
                </select>
                <button className='btn-finally-create' onClick={SaveRoom}>Create Room</button>
            </div>

            {/* Room Form 3 - After Success */}
            
            <div className="room-created"  style={{"display" : roomForm3}}>
              <h6 className='room-created-heading'>
                Your room has been Successfully created.
              </h6>
              <div className="room-img-onSuccess">
                <img src="./media/img4.jpg" alt="chatroom-img" className="success-roomimage" />
              </div>
              
              <h6 className="roomid-heading">
                Share Your room id with your friends. They can join your room via room id.<br/>
                Your room id is : 

              </h6>
              <h6 className="roomid">
                {roomId}
              </h6>
              <button className='btn-finally-goHome' onClick={()=>history.push("/Home")}>Go to Home</button>
            </div>
              

          </div>
        </div>
        <div id="first"></div>
    </>
  )
}

export default AddRoom;