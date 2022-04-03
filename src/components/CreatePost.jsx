import React from 'react'
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import http from '../plugins/http'

const CreatePost = ({thisUser, socket}) => {
    
    const {id} = useParams()
    const [message, setMessage] = useState("")
    console.log(thisUser.username, id)
    
    const inputs ={
        text: useRef(),
        photo: useRef(),
        youtubeUrl: useRef()
      }
    
    const createpost = async() =>{

        const post={
            text: inputs.text.current.value,
            photo: inputs.photo.current.value,
            youtubeUrl: inputs.youtubeUrl.current.value,
        }
        console.log(post)
        const res = await http.post(post,'createpost/'+id)
            console.log("result from http", res, res.message)

        setMessage(res.message)
        inputs.text.current.value=''
        inputs.photo.current.value=""
        inputs.youtubeUrl.current.value=""
        if(res.success){
            // console.log("socket must be there")
            socket.emit("newPost", thisUser.username+" has written new post in topic "+ '"'+res.oneTopic.title+'" ')
        }
    
    // console.log("create auction", auction)

    }






  return (
    <div>
        
        <h4>Create Post</h4>
        <div className='d-flex just-center'>
                <div className='reg-inputs'>
                    <label>Type you post: </label><br/>
                    <textarea rows="10" cols="60" placeholder='Required, the post can be 10-250 characters length' ref={inputs.text}/><br/><br/>
                    <label>Youtube clip URL:</label><br/>
                    <input className='mt-5' type="text" size="80" ref={inputs.youtubeUrl} placeholder='Optional'/><br/><br/><br/>
                    <label>Picture URL:</label><br/>
                    <input className='mt-5' type="text" size="80" ref={inputs.photo} placeholder="Optional"/><br/><br/>
                    <button onClick={()=>createpost()} className="ml-0">Create new post</button>
                </div>
        </div>
        <h4>{message}</h4>









    </div>
  )
}

export default CreatePost