import React from 'react'
import { useState, useEffect } from 'react'
import http from '../plugins/http'
import TopicCard from './TopicCard'

const MyTopics = ({thisUser}) => {

    const [alltopics, setAllTopics] =useState([])
 
    useEffect(()=>{
      getAllTopics()

    },[])

    const getAllTopics = async() =>{
      const res = await http.get('alltopics')
      console.log("result from http", res)
      const myTopics = res.allTopics.filter(x=>x.username===thisUser.username)
      setAllTopics(myTopics)
    }
  return (
    <div>
        
        {alltopics.length >0 ?
            <div>
                <div className='d-flex user-card-all topic-header'>
                    <div className='flex5'>
                        <h3>Topics </h3>
                    </div>
                    <div className='flex2 pl-20 text-left'>
                        <h3>Create time </h3> 
                    </div>
                    <div className='flex1 pl-20 text-left'>
                        <h3>Posts </h3> 
                    </div>
                    <div className='flex4 pl-20'>
                        <h3>Created by</h3>
                    </div>
                        
                </div>   
                {alltopics.map((x,i) =>
                    <TopicCard topic={x} key={i}/>
                )}
            </div>
        :   
        <h3>There are no any topics in the list</h3>
        } 
    </div>
  )
}

export default MyTopics