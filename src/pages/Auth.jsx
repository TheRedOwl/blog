import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { midleStyle } from '../utils'


export const Auth = () => {
  const { user, signInUser, signUpUser, msg } = useContext(UserContext)
  const navigate = useNavigate()

  const location = useLocation()
  console.log(location.pathname);
  const isSignIn = location.pathname == '/auth/in'//true vagy false

  console.log(msg);

  const handleSubmit = (event) => {
    event.preventDefault
    const data = new FormData(event.currentTarget)
    console.log(data.get('email'), data.get('password'), data.get('displayName'));
    if (isSignIn) {
      signInUser(data.get('email'), data.get('password'))
    } else {
      //regisztráció
      signUpUser(data.get('email'), data.get('password'), data.get('displayName'))
    }

  }

  console.log(user);

  return (
    <div className='page'>
      <div style={midleStyle}>
        <h3 style={{ color: "var(--color1)" }}>{isSignIn ? 'Bejelentkezés' : 'Regisztráció'}</h3>
        <Form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
          {!isSignIn &&
            <FormGroup>
              <Input name="displayName" placeholder="username" type="text" />
            </FormGroup>
          }
          <FormGroup>
            <Input name="password" placeholder="password" type="password" />
          </FormGroup>
          <FormGroup>
            <Input name="email" placeholder="email" type="email" />
          </FormGroup>
          <Button style={{ backgroundColor: "var(--bgColor)", marginTop:"20px", marginBottom:"10px" }}> Submit  </Button>
        </Form>
        <a href="#" onClick={() => navigate('/pwreset')} style={{ color: "var(--color1)" }}>Elfelejtett jelszó...</a>
        {msg && <Toastify  {...msg} />}
      </div>
    </div>
  )
}


