import React from "react";
import { useContext } from "react";
import { Form, useLocation } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { UserContext } from "../content/UserContext";
import { Toastify } from "../components/Toastify";

const middleStyle={
  width:"400px",
  position:"absolute",
  top:"50%",
  left:"50%",
  transform:"translate(-50%,-50%)",
  border:"3px solid #011936",
  borderRadius:"15px",
  padding:"10px",
  boxShadow:"0 10px 12px 10px #011936",
  backgroundColor:"#82A3A1"
}

const txtcolor={
    color:"white"
}

export const Auth = () => {
    const {user,signInUser,signUpUser,msg} = useContext(UserContext)

    const location = useLocation()
    console.log(location.pathname);
    
    const isSignIn=location.pathname=="/auth/in" //true vagy false lesz

    console.log(msg);
    

    const handleSubmit = (event) => {
      event.preventDefault
      const data=new FormData(event.currentTarget)  
      console.log(data.get("email"),data.get("password"),data.get("displayName"));
      
      if(isSignIn){
        signInUser(data.get("email"),data.get("password"))
      }else{
        signUpUser(data.get("email"),data.get("password"),data.get("displayName"))
      }
    }

    console.log(user);
    

    return (
        <div className="page">
            <div style={middleStyle}>
                <h3 style={{textAlign:"center", color:"#011936"}}>{isSignIn ? "Login" : "Register"}</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label style={txtcolor}>Email</Label>
                        <Input name="email" placeholder="Email:" type="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label style={txtcolor}>Password</Label>
                        <Input name="password" placeholder="Password:" type="password"/>
                    </FormGroup>
                    {
                        !isSignIn &&
                        <FormGroup>
                            <Label style={txtcolor}>Username</Label>
                            <Input name="displayName" placeholder="Username:" type="text"/>
                        </FormGroup>
                    }
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button style={{backgroundColor:"#011936"}}>Submit</Button>
                    </div>
                </Form>
            </div>
            {msg && <Toastify {...msg} /> }
        </div>
    );
};
