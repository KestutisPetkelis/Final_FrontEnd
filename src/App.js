import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import AllUsers from './pages/AllUsers';
import ChangeAvatar from './pages/ChangeAvatar';
import CreateTopic from './pages/CreateTopic';
import SingleTopic from './components/SingleTopic';
import CreatePost from './components/CreatePost';
import Favorites from './pages/Favorites';
import './App.css';

import io from "socket.io-client" ;
const socket = io.connect("http://localhost:4000")        

function App() {
  const divStyle = {
    width: "100%", 
    minHeight: "100vh",
    // border: "1px solid blue",
    marginTop: "0px",
    // marginBottom: "10px",
    // marginLeft: "10px",
    padding: "20px",
    backgroundColor: "aliceblue",
  };

  const [toolbar, setToolbar] = useState((true))
  const [message, setMessage] = useState("")
  const [thisUser, setThisUser] = useState({username:"", photo:""})
  const [infoFromServer, setInfoFromServer] = useState("")

  if (!localStorage.getItem('favoritesTopic')) localStorage.setItem('favoritesTopic', JSON.stringify([]));

  useEffect(() => {
    socket.on('infoToAll', message => {
      console.log(message);
      setInfoFromServer(message+' (close)');
      //setPseudoModal(true)
    });
    return () => socket.off('infoToAll');
  }, [socket, message]);

  return (
    <div className="App" style={divStyle}>
      <h3 style={{textAlign:"left", color: "blue"}}><i>Simple Forum</i></h3>

      <BrowserRouter>
      
    <Header toolbar={toolbar} setToolbar={setToolbar} setMessage={setMessage} thisUser={thisUser} setThisUser={setThisUser}/>
    
    <div onClick={()=>setInfoFromServer("")} className="pointer socketmsg"> 
        <i>{infoFromServer}</i>
     </div>
   
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/login" element={<Login toolbar={toolbar} setToolbar={setToolbar} 
                  message={message} setMessage={setMessage}
                  setThisUser={setThisUser}/>}></Route>
        <Route path="/register" element={<Register />}></Route> 
        <Route path="/allusers" element ={<AllUsers />} ></Route> 
        <Route path="/changeavatar" element ={<ChangeAvatar />} ></Route> 
        <Route path="/createtopic" element={<CreateTopic socket={socket}/>}/>
        <Route path="/createpost/:id" element={<CreatePost socket={socket} thisUser={thisUser}/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        {/* <Route path="/myauctions" element={<MyAuctions/>}/> */}
        {/* <Route path="/bidshistory" element={<BidsHistory/>}/> */}
        <Route path="/singletopic/:id" element={<SingleTopic socket={socket} thisUser={thisUser}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
