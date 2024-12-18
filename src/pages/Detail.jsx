import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost } from '../utility/crudUtility'
import { useState } from 'react'
import parse from 'html-react-parser'
import { MdDelete } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm'
import { delPhoto } from '../utility/uploadFile'


export const Detail = () => {

    const [post,setPost]=useState(null)

    const params=useParams()
    const navigate=useNavigate()
    const confirm=useConfirm()

    console.log(params.id);
    

    useEffect(()=>{
        readPost(params.id,setPost)
    },[])

    post && console.log(post);
    
    const handleDelete=async ()=>{
      try {
        await confirm({
          description:"Ez a művelet nem vonható vissza!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a bejegyzést?"
      })

      deletePost(post.id)
      delPhoto(post.photo.id)
      navigate('/posts')

      } catch (error) {
        console.log(error);
        
      }
    }

  return (
    <div className='page'>
      <div>
      {post && 
        <>
          <img src={post.photo['url']} alt={post.title} style={{maxWidth:"300px"}} />
          <div>{parse(post.story)}</div>
        </>
      }
      <button className='btn btn-secondary' onClick={()=>navigate('/posts')}>vissza</button>
      <button className='btn btn-danger' onClick={handleDelete}><MdDelete/></button>
      </div>
      
    </div>
  )
}
