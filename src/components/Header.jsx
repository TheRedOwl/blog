import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { NavLink, Outlet } from 'react-router-dom';
import { GrBlog } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import { useContext } from 'react';
import { UserContext } from '../content/UserContext';


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logoutUser}=useContext(UserContext)


  console.log(user);

  

  const toggle = () => setIsOpen(!isOpen);

  return (
    < >
      <Navbar id='headerbar' fixed='top' dark expand="md" style={{borderBottom:"3px solid black", backgroundColor:"#011936"}}>
        <NavbarBrand href="/"><GrBlog/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

            <NavItem>
              <NavLink className="nav-link" to='/' >Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to='/posts'>
                Posts
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            { !user ? <>
                        <NavItem>
                          <NavLink className="nav-link" to='/auth/in' >Login</NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink className="nav-link" to='/auth/up'>Register</NavLink>
                        </NavItem>
                      </> 
                      :
                      <>
                        <NavItem>
                          <NavLink className="nav-link" to='/' onClick={()=>logoutUser()}>Logout</NavLink>
                        </NavItem>
                      
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <RxAvatar/>
              </DropdownToggle>
              <DropdownMenu end style={{backgroundColor:"#82A3A1"}}>
                <DropdownItem style={{color:"white"}}>Personal data</DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{color:"white"}}>Delete profile</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </>
            }
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet/>
    </>
  );
}