import React from 'react'
import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsChevronDoubleRight } from "react-icons/bs";
import ReactPlayer from 'react-player/youtube'
import http from '../plugins/http';

const SingleTopic = ({thisUser}) => {
    const {id} = useParams()
    console.log(id, thisUser)
    const nav= useNavigate()

    const [singleTopic, setSingleTopic] =useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getSingleTopic()

    },[])

    const getSingleTopic = async() =>{
        const res = await http.get('topic/'+id)
        console.log("result from http", res, res.singletopic.title)
        setSingleTopic(res.singletopic)
        setLoading(false)
    }

    const createPost = (arg) =>{
        console.log("click", arg)
        nav("/createpost/"+arg)
    }

    if (loading)
        return <div> loading...</div>

  return (
    <div>
        <div>
            <div className='d-flex user-card-all topic-header'>
                <div className='flex5'>
                    <h3>Discussion <BsChevronDoubleRight className='mb--4'/> &emsp; "{singleTopic.title}"</h3>
                </div>
                <div className='flex2 pl-20 text-left'>
                        
                </div>
                <div className='flex3 pl-20 text-left'>
                <h5>Created {(new Date(singleTopic.time)).toLocaleString('lt-Lt')} by {singleTopic.username}</h5>  
                </div>
                <div className='flex2 pl-20'>
                    {thisUser.username && <button onClick={()=>createPost(id)}>Create post</button>}
                </div>
                    
            </div>   
            
        </div>
        
        {singleTopic.posts.length >0 ?
            <div>
                <div >
                    
                    {singleTopic.posts.map((x,i) =>
                        <div className='d-flex post-card'>
                            <div className='flex2'>
                                <span>Written by: </span> <br/> 
                                <b>{x.username}</b> <br/>
                                <span className='post-time'>{(new Date( x.time)).toLocaleString('lt-Lt')} </span><br/>
                           </div>
                           <div className='flex8 text-left pl-20'>
                                {x.photo &&
                                    <>
                                        <img src={x.photo} className="post-img" alt="nieko"/><br/>
                                    </>
                                }
                                {x.text}<br/>
                                {x.youtubeUrl &&
                                    <>
                                        <a href={x.youtubeUrl}>{x.youtubeUrl}</a>
                                        <ReactPlayer url={x.youtubeUrl} width='370px' height='210px'/>
                                    </>
                                }
                            </div>
                        </div>
                    )}
                                            
                </div>   
                
            </div>
        :   
        <h3>There are no any posts in this discussion</h3>
        } 
    </div>
  )
}

export default SingleTopic