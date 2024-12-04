import React from "react";
import { useContext } from "react";
import { Form, useLocation } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { UserContext } from "../content/UserContext";
import { Toastify } from "../components/Toastify";

const midleStyle={
  width:"300px",
  position:"absolute",
  top:"50%",
  left:"50%",
  transform:"translate(-50%,-50%)"
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
            <div style={midleStyle}>
                <h3>{isSignIn ? "Login" : "Register"}</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label >Email</Label>
                        <Input name="email" placeholder="Email:" type="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label >Password</Label>
                        <Input name="password" placeholder="Password:" type="password"/>
                    </FormGroup>
                    {
                        !isSignIn &&
                        <FormGroup>
                            <Label >Username</Label>
                            <Input name="displayName" placeholder="Username:" type="text"/>
                        </FormGroup>
                    }
                    <Button>Submit</Button>
                </Form>
                {msg && <Toastify {...msg} /> }
            </div>
        </div>
    );
};
