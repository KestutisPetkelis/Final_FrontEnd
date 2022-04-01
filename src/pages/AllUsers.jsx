import React from 'react'
import http from '../plugins/http'
import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'

const AllUsers = () => {
    const [allusers, setAllUsers] =useState([])
    useEffect(()=>{
        getAllUsers()

    },[])

    const getAllUsers = async() =>{
        const res = await http.get('allusers')
        console.log("result from http", res)
        setAllUsers(res.allUsers)
    }

  return (
    <div>
        <h2>User List</h2>
        {allusers.length >0 ?
            <div>
                <div>Username     Registered </div>   
                {allusers.map((x,i) =>
                    <UserCard user={x} key={i}/>
                )}
            </div>
        :   
        <h3>User list is empty</h3>
        }
    </div>
  )
}

export default AllUsers