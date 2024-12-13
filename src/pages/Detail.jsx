import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { readPost } from '../utility/crudUtility'
import { useState } from 'react'

export const Detail = () => {

    const [post,setPost]=useState(null)

    const params=useParams()

    useEffect(()=>{
        readPost(params.id,setPost)
    },[])

    post && console.log(post);
    

  return (
    <div>

    </div>
  )
}
