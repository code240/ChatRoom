import React from "react";



const Message = (props) => {
  if(props.senderid === "me"){
    if(props.replyExist === false){
      return (
        <>
          {/* my message */}
          <div className="my-msg">
            <div className="my-msg-bubble" id={props.msgId} onDoubleClick={() => props.select(props.msgId)}>
              <h5 className="my-msgText">{props.msg}</h5>
            </div>
            <div className="cb"></div>
          </div>
        </>
      )
    }else{
        return(
          <>
            {/* my reply message  */}
            <div className="my-msg">
              <div className="my-msg-bubble" id={props.msgId} onDoubleClick={() => props.select(props.msgId)}>
                <div className="MyReplyOn-div">
                  <h6 className="MyReplyTo">{props.reply_senderName}</h6>
                  <h6 className="MyReplyOnMessage">{props.reply_msg}</h6>
                </div>
                <h5 className="my-msgText">{props.msg}</h5>
              </div>
              <div className="cb"></div>
            </div>
          </>
        )
    }
  }else{
    if(!props.replyExist){
      return(
        <>
          {/* opponent message */}
          <div className="opponent-msg">
            <div className="opponent-dp-div">
              <img
                src={`./media/dp/${props.senderDp}`}
                className="opponent-avtar"
                alt="DP"
              />
            </div>
            <div className="opponent-msg-bubble" id={props.msgId} onDoubleClick={() => props.select(props.msgId)}>
              <h6 className="nameOnMsgBubble">{props.senderName}</h6>
              <h5 className="opponent-msgText">{props.msg}</h5>
            </div>
            <div className="cb"></div>
          </div>
        </>
      )
    }else{
        return(
          <>
              {/* opponent reply message */}
              <div className="opponent-msg">
                <div className="opponent-dp-div">
                  <img
                    src={`./media/dp/${props.senderDp}`}
                    className="opponent-avtar"
                    alt="DP"
                  />
                </div>
                <div className="opponent-msg-bubble" id={props.msgId} onDoubleClick={() => props.select(props.msgId)}>
                  <h6 className="nameOnMsgBubble">{props.senderName}</h6>
                  <div className="OppponentReplyOn-div">
                    <h6 className="OpponentReplyTo">{props.reply_senderName}</h6>
                    <h6 className="OpponentReplyOnMessage">
                      {props.reply_msg}
                    </h6>
                  </div>
                  <h5 className="opponent-msgText">{props.msg}</h5>
                </div>
                <div className="cb"></div>
              </div>

          </>
        )
    }
  }
}







// const xyz = () => {
//   return (
//     <>
//       {/* opponent message */}
//       <div className="opponent-msg">
//         <div className="opponent-dp-div">
//           <img
//             src="./media/avtars/avtar15.png"
//             className="opponent-avtar"
//             alt="DP"
//           />
//         </div>
//         <div className="opponent-msg-bubble">
//           <h6 className="nameOnMsgBubble">Neha Sharma</h6>
//           <h5 className="opponent-msgText">Hello, kya hal hai??</h5>
//         </div>
//         <div className="cb"></div>
//       </div>
//       {/* my message */}
//       <div className="my-msg">
//         <div className="my-msg-bubble">
//           <h5 className="my-msgText">Main...thik hu tu bta...tu ksa h</h5>
//         </div>
//         <div className="cb"></div>
//       </div>

//       {/* opponent reply message */}
//       <div className="opponent-msg">
//         <div className="opponent-dp-div">
//           <img
//             src="./media/avtars/avtar15.png"
//             className="opponent-avtar"
//             alt="DP"
//           />
//         </div>
//         <div className="opponent-msg-bubble">
//           <h6 className="nameOnMsgBubble">Neha Sharma</h6>
//           <div className="OppponentReplyOn-div">
//             <h6 className="OpponentReplyTo">Vipin Rao</h6>
//             <h6 className="OpponentReplyOnMessage">
//               Main...Thik hu tu bta...tu ksa h
//             </h6>
//           </div>
//           <h5 className="opponent-msgText">Hello, kya hal hai??</h5>
//         </div>
//         <div className="cb"></div>
//       </div>

//       {/* my reply message  */}
//       <div className="my-msg">
//         <div className="my-msg-bubble">
//           <div className="MyReplyOn-div">
//             <h6 className="MyReplyTo">Vipin Rao</h6>
//             <h6 className="MyReplyOnMessage">Hello, kya hal hai??</h6>
//           </div>
//           <h5 className="my-msgText">Main...thik hu tu bta...tu ksa h Ghar me sb kaisa hai?</h5>
//         </div>
//         <div className="cb"></div>
//       </div>
//     </>
//   );
// };

export default Message;
