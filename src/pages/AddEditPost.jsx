import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { BarLoader } from 'react-spinners'
import { addPost, readPost, updatePost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { CategDropdown } from '../components/CategDropdown'
import { Alert } from '../components/Alert'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const AddEditPost = () => {

  const { categories } = useContext(CategContext)
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [story, setStory] = useState(null)
  const [selCateg, setSelCateg] = useState(null)
  const [post, setPost] = useState(null)
  const params = useParams()
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({})

  const onSubmit = async (data) => {
    console.log(data.displayName);
    setLoading(true)
    if (params.id) {
      //update van
      console.log();

      try {
        updatePost(params.id, { ...data, category: selCateg, story })
      } catch (error) {
        console.log("update error: ", error);

      } finally {
        setLoading(false)
      }
    } else {
      //insert lesz
      let newPostData = {
        ...data,
        story,
        author: user.displayName,
        userId: user.uid,
        category: selCateg,
        likes: []
      }
      console.log(newPostData);

      try {
        const file = data.file[0]
        const { url, id } = await uploadFile(file)
        delete newPostData.file
        newPostData = { ...newPostData, photo: { url, id } }
        console.log(newPostData);
        addPost(newPostData)
        setUploaded(true)
        reset()
        setPhoto(null)
        setStory(null)

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false)
      }
    }
  }


  console.log(post);


  useEffect(() => {
    if (params?.id) readPost(params.id, setPost)
  }, [params?.id])

  useEffect(() => {
    if (post) {
      setValue("title", post.title)
      setSelCateg(post.category)
      setStory(post.story)
      setPhoto(post.photo.url)
    }
  }, [post])

  if (!user) return <Home />

  return (
    <div className='page'>
      <div style={{width:"1000px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ paddingTop:"60px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"350px"}}>
              <div className='categ-title' style={{ display:"flex", justifyContent: "space-between", color: "var(--color1)", flexWrap:"wrap", padding:"10px" }}>
                <h3 >A bejegyzés címe: </h3>
                <input {...register('title', { required: true })} placeholder='Title' type='text' style={{ borderRadius: "50px", padding: "10px", width: "501px" }} />
              </div>
              <div className='categ-story' style={{ display: "flex", justifyContent: "space-between", padding:"10px", flexWrap:"wrap-reverse", gap:"10px" }}>
                <CategDropdown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg} />
                <Story setStory={setStory} uploaded={uploaded} story={story} />
              </div>
            </div>

            <div className='categ-image' style={{marginTop:"70px"}}>

              <div className='categ-title' style={{ display:"flex", justifyContent: "space-between", color: "var(--color1)", flexWrap:"wrap", padding:"10px" }}>
            
            
              <h3 >Image for the blog: </h3>
              <input
                disabled={params.id} {...register('file', params.id ? {} : {
                required: true,
                validate: (value) => {
                  if (!value[0]) return true
                  const acceptedFormats = ['jpg', 'png']
                  console.log(value[0]);
                  const fileExtension = value[0].name.split('.').pop().toLowerCase()
                  if (!acceptedFormats.includes(fileExtension)) return "Invalid file format"
                  if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett máximális file méret 1MB"
                  return true
                }
              })} type='file'
                onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              />
              </div>
              <p className='text-danger'>{errors?.file?.message}</p>
              <p className='text-danger'>{errors?.file && "Kép feltöltése kötelező!"}</p>
              <p className='text-danger'>{errors?.title && "A cím megadása kötelező"}</p>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
              <input disabled={!selCateg || !story || story?.length < 10} type="submit" style={{width:"200px"}} />
            </div>
          </div>
        </form>
        {loading && <BarLoader />}
        {uploaded && <Alert txt="Sikeres feltöltés!" />}
        <div style={{display:"flex", justifyContent:"center", padding:"30px"}}>
          {photo && <img style={{ width: "300px", borderRadius:"15px" }} src={photo} />}
        </div>
      </div>
    </div>
  )
}


