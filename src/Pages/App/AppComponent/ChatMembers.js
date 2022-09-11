import React from "react";

const ChatMembers = (props) => {
  return (
    <>
      <div className="personDiv" style={{"backgroundColor" : props.color}}>
        <div className="userDp-chatScreen">
          <img
            src={`./media/dp/${props.avtar}`}
            alt="user_dp"
            className="userIMG-chatScreen"
          />
        </div>
        <div className="aboutUser-chatScreen">
          <h6 className="userName-chatScreen">{props.username}</h6>
          <h6 className="userEmail-chatScreen text-truncate">{props.email}</h6>
        </div>
        <div className="cb"></div>
      </div>
    </>
  );
};

export default ChatMembers;
