import React, { useContext, useEffect, useRef } from 'react'
import './Message.css';
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageinfo">
          <img className="messageinfoimg" src={ message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="img" />
        </div>
        <div className="messagecontent">
          {message.text && <p className="messagecontentp">{message.text}</p>}
          {message.image && <img className="messagecontentimg" src={message.image} alt="img" />}
        </div>
    </div>
  )
}

export default Message;