import React, { useContext } from 'react'
import './Mininav.css';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { AuthContext } from '../context/Authcontext';

const Mininav = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="mininavbar">
      <div className="mininavbaruser">
        <img className='currentuserpp' src={currentUser.photoURL} alt={currentUser.displayName} />
        <span>{currentUser.displayName}</span>
      </div>
      <button className="mininavbarbutton" onClick={()=>signOut(auth)}>Logout</button>
    </div>
  )
};

export default Mininav;