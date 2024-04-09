import React from 'react'
import './Home.css';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className="home">
        <div className="homecontainer">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home;