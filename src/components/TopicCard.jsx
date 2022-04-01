import React from 'react'
import "./style.css"

const TopicCard = ({topic}) => {
   
  return (
    <div>
        <div className='user-card d-flex space-between just-start'>
            <div className='flex1'>
                <img src={topic.photo} alt="no avatar"/>
            </div>
            <div className='flex2 pl-20 text-left'>
                <p className='mt-30'>{topic.username}</p>
            </div>
            <div className='flex2'>
                <p className='mt-30'>{(new Date(topic.time)).toLocaleString('lt-Lt')}</p>
            </div>
            <div className='flex2'>
                <p className='mt-30'>{topic.title}</p>
            </div>
            <div className='flex2'>
                <p className='mt-30'>{topic.posts.length}</p>
            </div>

        </div>
    </div>
  )
}

export default TopicCard