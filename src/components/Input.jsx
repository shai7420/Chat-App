import React, { useContext, useState } from 'react'
import './Input.css';
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';
import { BsPaperclip } from "react-icons/bs";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from "uuid";

const Input = () => {

  const [ text, setText] = useState("");
  const [ image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const send = async () => {
    try {

      if (!text.trim() && !image) {
        return;
      }

      if (image) {

        const storageRef = ref(storage, `${currentUser.displayName}_${data.user.displayName}/${uuid()}`);
        await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            image: downloadURL,
          }),
        });

      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="inputsinput">
        <input className="inputsinputfirstinput" type="text" placeholder='Write something awesome...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <input className='d-none' type="file" id='image' name='image' onChange={(e) => setImage(e.target.files[0])}/>
          <label htmlFor="image">
            <BsPaperclip className="clip" />
          </label>
        <button className="sendbutton" onClick={send}>Send</button>
      </div>
    </div>
  )
}

export default Input;