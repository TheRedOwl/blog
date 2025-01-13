import React from 'react'
import { midleStyle } from '../utils'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'


export const PwReset = () => {
  const {msg,resetPassword}=useContext(UserContext)

  const handleSubmit=(event)=>{
    event.preventDefault()
     const data=new FormData(event.currentTarget)
     console.log(data.get('email'));
     
   resetPassword(data.get('email'))
  }
  return (
    <div className='page'>
    <div style={midleStyle}>
     <h3 style={{color:"var(--color1)", textAlign:"center"}}>Jelszó módosítás</h3>
     <Form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
       <FormGroup>
         <Input   name="email"    placeholder="email"    type="email"    />
       </FormGroup>
       
       <Button> Új jelszó igénylése  </Button>
     </Form>
     
     {msg && <Toastify  {...msg}/>}
    </div>
   </div>
  )
}


