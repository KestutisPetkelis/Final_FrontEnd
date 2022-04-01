import React from 'react'
import "./style.css"

const UserCard = ({user}) => {
  return (
    <div>
       <div className='user-card'>
        {user.username}
        {(new Date(user.createTime)).toLocaleString('lt-Lt')}
        {user.photo}
        </div>
    </div>
  )
}

export default UserCard