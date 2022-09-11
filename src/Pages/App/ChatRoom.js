import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./app_css/chatRoom.css";
import { API, API_KEY } from "../API/Api";
import ChatMembers from "./AppComponent/ChatMembers";
import useSound from "use-sound";
import boopSfx from "./Sound/boop.mp3";
import Message from "./AppComponent/Message";
import { CheckLoginStatus } from "./../Logics/CheckLoginStatus";
import { Decoding } from "../Logics/Encoding";
import Cookies from "universal-cookie";
import AvtarsData from "./StaticData/AvtarsData";

const ChatRoom = () => {
  const cookies = new Cookies();
  const [play] = useSound(boopSfx);
  const location = useLocation();
  const history = useHistory();
  const [isOk, setIsOk] = useState(false);
  const [roomId, setRoomId] = useState("");

  const [roomDetails, setRoomDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [prevSelected,setPrevSelected] = useState("sample");

  const [messages, setMessages] = useState([]);
  const [messageBoxHeight, setMessageBoxHeight] = useState("2.5rem");
  const [prevMessages, setPrevMessages] = useState([]);
  const [messageTimer, setMessageTimer] = useState(-1);
  const [message4send, setMessage4Send] = useState("");
  const [replyTO, setReplyTo] = useState(0);
  const [me, setMe] = useState("");
  // const colors = ["aliceblue","#ffecf9","#ebffe6","#fffee4","#ddffe4"];
  const colors = ["#f0f2f5", "#f0f2f5", "#f0f2f5", "#f0f2f5", "#f0f2f5"];

  useEffect(() => {
    const response = CheckLoginStatus();
    if (response === false) {
      history.push("/");
    } else {
      response.then((res) => {
        if (res.error === true) {
          history.push("/");
        } else {
          if (location.state === undefined) {
            setIsOk(false);
            history.push("/Home");
          } else {
            setRoomId(location.state.roomid);
            // setIsOk(true);
            setMe(Decoding(cookies.get("chatroom_uid")));
            setMessageTimer(0);
            document
              .querySelector("meta[name=theme-color]")
              .setAttribute("content", "#1365e1");
          }
        }
      });
    }
  }, [isOk]);

  useEffect(() => {
    if (roomId != "") {
      axios
        .post(`${API}/API/ThisRoomInfo`, {
          API_KEY: API_KEY,
          roomId: roomId,
        })
        .then((response) => {
          if (response.data.error === true) {
            setIsOk(false);
            alert("Something went wrong with this room...");
            history.push("/Home");
          } else {
            if (response.data.success === true) {
              setUserDetails(response.data.members);
              setRoomDetails(response.data.roomDetails);
              setIsOk(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error while fetching room data");
          history.push("/Home");
          setIsOk(false);
        });
    }
  }, [roomId]);

  // fetch message
  useEffect(() => {
    const scrollBottom = (element) => {
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    };
    // console.log(roomId);
    axios
      .post(`${API}/API/getMessages`, {
        API_KEY: API_KEY,
        roomid: roomId,
      })
      .then((response) => {
        if (response.data.error === true) {
          // sendMessage(prevMessages);
          // alert("ha")
          return false;
        }

        setPrevMessages(messages);
        setMessages(response.data.message);
        if (prevMessages.length < messages.length) {
          scrollBottom(document.getElementById("chats"));
          play();
        }

        if (messageTimer < 3) {
          scrollBottom(document.getElementById("chats"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setMessageTimer(messageTimer + 1);
    }, 800);
  }, [messageTimer]);

  if (!isOk) {
    return (
      <>
        <div className="process-display">
          <div className="spinner spinner-1"></div>
        </div>
      </>
    );
  }
  const showNav = () => {
    document.getElementById("leftChatscreen").style.display = "block";
    document.getElementById("detail").style.display = "none";
    document.getElementById("cross").style.display = "block";
  }
  const hideNav = () => {
    document.getElementById("leftChatscreen").style.display = "none";
    document.getElementById("detail").style.display = "block";
    document.getElementById("cross").style.display = "none";
  }
  

  const selectReply = (id) => {
    document.getElementById(prevSelected).style.border = "0px";
    document.getElementById(id).style.border = "3px solid red";
    if(prevSelected === id){
      document.getElementById(prevSelected).style.border = "0px"; 
      document.getElementById("msg").focus();
      window.navigator.vibrate(80);
      setPrevSelected("sample");
      setReplyTo(0)
    }else{
      document.getElementById("msg").focus();
      window.navigator.vibrate(80);
      setPrevSelected(id);
      setReplyTo(id)
    }
    
  }

 
  const sendMessage = () => {
    if (message4send.trim().length === 0) {
      return false;
    }
    document.getElementById("msg").focus();
    document.getElementById("sendBtn").disabled = true;
    document.getElementById(replyTO).style.border = "0px";
    axios
      .post(`${API}/API/SendMessage`, {
        API_KEY: API_KEY,
        message: message4send,
        replyTo: replyTO,
        roomId: roomId,
        me: me,
      })
      .then((response) => {
        if (response.data.error === true) {
          alert("failed to send message");
        } else {
          if (response.data.success === true) {
            setMessage4Send("");
            setMessageBoxHeight("2.5rem");
            setReplyTo(0);
            document.getElementById("msg").focus();
            document.getElementById("sendBtn").disabled = false; 
          }
        }
      })
      .catch((error) => {
        alert("cannot connect with server!");
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage();
      setMessageBoxHeight("2.5rem");
    }
    if (event.key === "Enter" && event.shiftKey) {
      if (messageBoxHeight === "2.5rem") {
        setMessageBoxHeight("3.5rem");
      }
      if (messageBoxHeight === "3.5rem") {
        setMessageBoxHeight("4.5rem");
      }
      if (messageBoxHeight === "4.5rem") {
        setMessageBoxHeight("5.5rem");
      }
    }
  };

  // code here
  return (
    <>
      <div id="sample"></div>
      <div id="0"></div>
      <div className="chatRoom-mainScreen">
        <div className="upperSide"></div>
      </div>
      <div className="mainFixed-chatScreen">
        <div className="left-ChatScreen" id="leftChatscreen">
          <div className="leftHeader">chatroom</div>
          <div className="forRoomInfo-left">
            <div className="for-dp-inLeftRoomInfo">
              <img
                src={`./media/avtars/${
                  AvtarsData[parseInt(roomDetails.roomavtar) - 1].avtarSource
                }`}
                alt="avtar"
                className="avtarIconInChatScreen"
              />
            </div>
            <div className="for-detailOfRoom-left">
              <h4 className="roomName-inLeftChatScreen">
                {roomDetails.roomname}
              </h4>
              <h4 className="roomid-inChatScreen">
                Room id : <span className="roomid-text">{roomId}</span>
              </h4>
            </div>
            <div className="cb"></div>
          </div>
          <div className="bottomPart-leftChatScreen">
            <h6 className="members-heading">
              Members ({roomDetails.nowMember}/{roomDetails.maxMember})
            </h6>

            {userDetails.map((item, index) => {
              return (
                <ChatMembers
                  key={index}
                  color={colors[0]}
                  avtar={item.user_avtar}
                  username={item.user_name}
                  email={item.user_email}
                />
              );
            })}
          </div>
        </div>
        <div className="right-chatScreen">
          <header className="chatScreen-header">
            <div className="backbtnDiv" onClick={()=>history.push("/Home")}> <i className="fa-solid fa-arrow-left"></i> </div>
            <div className="roomDP-rightHeader">
              <img
                src={`./media/avtars/${
                  AvtarsData[parseInt(roomDetails.roomavtar) - 1].avtarSource
                }`}
                alt="avtar"
                className="roomAvtar-rightSide"
              />
            </div>
            <div className="roomDetail-rightSide">
              <h6 className="roomName-rightTop text-truncate">
                {roomDetails.roomname}
              </h6>
              <p className="otherNames text-truncate">
                {userDetails.map((item) => item.user_name + ", ")}
              </p>
            </div>
            <h6 className="roomDetail-icon" id="detail" onClick={showNav}>
              <i className="fa-solid fa-circle-info"></i>
            </h6>
            <h6 className="roomDetail-icon" id="cross" onClick={hideNav}>
              <i className="fa-solid fa-xmark"></i>
            </h6>
            <div className="cb"></div>
          </header>
          <section className="chatSection" id="chats">
            <h6 className="constant-heading">
              Enjoy Your Private Chats ! 
            </h6>

            {messages.map((item, index) => {
              if (item.senderid === me) {
                if (item.replyExist) {
                  let reply_senderName = "";
                  reply_senderName = userDetails.map((i) => {
                    if (i.userid === item.reply_senderid) {
                      return i.user_name;
                    }
                  });
                  return (
                    <Message
                      key={index}
                      senderid={"me"}
                      msg={item.main_msg}
                      msgId={item.id}
                      date={item.date}
                      time={item.time}
                      seenby={item.seenby}
                      replyExist={true}
                      reply_msg={item.reply_Msg}
                      reply_senderName={reply_senderName}

                      select = {selectReply}
                    />
                  );
                } else {
                  return (
                    <Message
                      key={index}
                      senderid={"me"}
                      msg={item.main_msg}
                      msgId={item.id}
                      date={item.date}
                      time={item.time}
                      seenby={item.seenby}
                      replyExist={false}

                      select = {selectReply}
                    />
                  );
                }
              }
              // Not me
              else {
                let senderData = userDetails.filter((i) => {
                    return i.userid === item.senderid;
                });

                let senderDp = senderData[0].user_avtar;
                let senderName = senderData[0].user_name;
                if (item.replyExist) {
                  let reply_senderName = "";
                  reply_senderName = userDetails.map((i) => {
                    if (i.userid === item.reply_senderid) {
                      return i.user_name;
                    }
                  });
                  return (
                    <Message
                      key={index}
                      senderid={item.senderid}
                      senderDp={senderDp}
                      senderName={senderName}
                      msg={item.main_msg}
                      msgId={item.id}
                      date={item.date}
                      time={item.time}
                      seenby={item.seenby}
                      replyExist={true}
                      reply_msg={item.reply_Msg}
                      reply_senderName={reply_senderName}

                      select = {selectReply}
                    />
                  );
                } else {
                  return (
                    <Message
                      key={index}
                      senderid={item.senderid}
                      senderDp={senderDp}
                      senderName={senderName}
                      msg={item.main_msg}
                      msgId={item.id}
                      date={item.date}
                      time={item.time}
                      seenby={item.seenby}
                      replyExist={false}

                      select = {selectReply}
                    />
                  );
                }
              }
            })}
          </section>
          <div className="chatScreen-inputArea">
            <textarea
              name="msg"
              id="msg"
              value={message4send}
              onChange={(e) => setMessage4Send(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ height: messageBoxHeight }}
              className="message-box"
              placeholder="Type here...."
            ></textarea>
            <button className="btn btn-primary send-btn" id="sendBtn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};







export default ChatRoom;
