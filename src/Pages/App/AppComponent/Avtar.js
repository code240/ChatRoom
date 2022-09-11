import React from 'react';

const Avtar = (prop) => {
    // console.log(prop)
  return (
    <>
        <div className="avtar-div avtar-div-1" id={prop.avtarCode}  onClick={() => prop.onTapFun(prop.avtarCode)}>
            <img src={`./media/avtars/${prop.img}`}  alt="chatroom avtar" className='avtar-png' />
        </div>
    </>
  )
}

export default Avtar;