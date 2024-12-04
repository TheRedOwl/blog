import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = ({err,signin}) => {
    const navigate=useNavigate()

    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-center",autoClose:2000,closeOnClick:true, theme:"dark", draggable:true, pauseOnHover:false,transition: Slide})
        }else if(signin){
            toast.success(signin,{position:"top-center",autoClose:2000,closeOnClick:true, theme:"dark", draggable:true, pauseOnHover:false,transition: Slide})
            setTimeout(()=>navigate("/"),2000)
        }


    },[err,signin])

  return (
    <div>
        <ToastContainer/>
    </div>
  )
}
