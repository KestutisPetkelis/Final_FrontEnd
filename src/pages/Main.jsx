import React from 'react'
import { useEffect, useState } from 'react'

import http from '../plugins/http'
import TopicCard from '../components/TopicCard'
import "./style.css"

const Main = () => {
    const [alltopics, setAllTopics] =useState([])
 
    useEffect(()=>{
      getAllTopics()

    },[])

    const getAllTopics = async() =>{
      const res = await http.get('alltopics')
      console.log("result from http", res)
      setAllTopics(res.allTopics)
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

export default Main