import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readLikes, readPost, toggleLike } from '../utility/crudUtility'
import { useState } from 'react'
import parse from 'html-react-parser'
import { MdDelete } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm'
import { delPhoto } from '../utility/uploadFile'
import { UserContext } from '../context/UserContext'
import { Alert } from '../components/Alert'
import { useContext } from 'react'


export const Detail = () => {

  const [post, setPost] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { user } = useContext(UserContext)
  const [txt, setTxt] = useState(null)

  console.log(params.id);


  useEffect(() => {
    readPost(params.id, setPost)
  }, [])

  post && console.log(post);

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Ez a művelet nem vonható vissza!",
        confirmationText: "Igen",
        cancellationText: "Mégsem",
        title: "Biztos ki szeretnéd törölni a bejegyzést?"
      })

      deletePost(post.id)
      delPhoto(post.photo.id)
      navigate('/posts')

    } catch (error) {
      console.log(error);

    }
  }
  const handleLikes = () => {
    if (!user) setTxt("Valami szöveg")
    else {
      toggleLike(user.uid, post.id)
    }
  }

  return (
    <div className='page'>
      <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        {post &&
          <>
            <img src={post.photo['url']} alt={post.title} style={{ maxWidth: "300px", margin:"10px", borderRadius:"15px" }} />
            <div style={{maxWidth:"500px", margin:"20px", textAlign:"justify", color:"var(--greyColor)", wordWrap:"break-word" }}>{parse(post.story)}</div>
          </>
        }
        <div style={{display:"flex", justifyContent:"space-around", width:"300px"}}>
          <button className='btn' style={{backgroundColor:"var(--color1)"}} onClick={() => navigate('/posts')}>vissza</button>
          <button className='btn' style={{backgroundColor:"var(--color1)"}} onClick={handleLikes}>like</button>
          {user && post && (user.uid == post.userId) &&
            <>
              <button className='btn' onClick={handleDelete} style={{backgroundColor:"var(--bgColor)"}}><MdDelete /></button>
              <button className='btn' style={{backgroundColor:"var(--color1)"}} onClick={() => navigate("/update/" + post.id)}>edit post...</button>
            </>
          }
        </div>
        
        {post && <span style={{marginTop:"10px", fontSize:"20px", fontWeight:"bolder", color:"var(--bgColor)"}}>Likes number: {post?.likes.length}</span>}
        

      </div>
      {txt && <Alert txt={txt} err={false} />}

    </div>
  )
}
