import React from 'react';
import { useHistory } from 'react-router-dom';
import "./../app_css/RoomCss.css";

const Rooms = (props) => {
  const history = useHistory();
  return (
  <>
        <div className='main-room-wrapper' onClick={() => history.push({pathname: '/ChatRoom',state: { roomid: props.roomid }})}>
            <div className="icon-wrapper">
                <img src={`./media/avtars/${props.imgName}`} className='roomAvtar'  alt="room-icons" />
            </div>
            <h2 className='my-roomName'>{props.roomName}</h2>
            <h4 className='memberExist'>{props.currentMember}/{props.maxMember} Members</h4>
        </div>
    </>
  )
}

export default Rooms; 