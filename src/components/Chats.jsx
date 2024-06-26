import React, { useContext, useEffect, useState } from "react";
import './Chats.css';
import {db} from "../Firebase";
import {AuthContext} from "../context/Authcontext";
import {ChatContext} from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(()=>{

    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };  

    currentUser.uid && getChats();
  },[currentUser.uid])

  const userSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  return (
    <div className="chatsSection">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div className="userchat" key={chat[0]} onClick={() => userSelect(chat[1].userInfo)}>
          <img className="userchatimg" src={chat[1].userInfo.photoURL} alt={chat[1].displayName} />
          <div className="userchatinfo">
            <span className="userchatinfospan">{chat[1].userInfo.displayName}</span>
            <p className="userchatinfop">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats;