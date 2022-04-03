import React from 'react'
import { useState, useEffect } from 'react'
import http from '../plugins/http'

const MyPosts = ({thisUser}) => {
  return (
    <div>
        MyPosts {thisUser.username}
    </div>
  )
}

export default MyPosts