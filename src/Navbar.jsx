import React, { useContext } from 'react';
import './Navbar.css';
import { NavLink } from "react-router-dom";
import { AuthContext } from './context/Authcontext';
import { auth } from './Firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <nav className="navbar navbar-dark navbar-expand-sm nav">
        <div className="container-fluid d-flex align-items-center justify-content-center mx-auto">
              {currentUser ? (
                <>
                  <NavLink to={"/"}><button className="button-8">Home</button></NavLink>
                </>
              ) : (
                <>
                  <NavLink to={"/Register"}><button className="button-8">Signup</button></NavLink>
                </>
              )}
                <li className="navbar-brand">Silver Chatz</li>
                
              {currentUser ? (
                <>
                  <button className="button-8" onClick={()=>signOut(auth)}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to={"/Login"}><button className="button-8">Login</button></NavLink>
                </>
              )}
        </div>
    </nav>
  )
}

export default Navbar;