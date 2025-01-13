import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
} from "reactstrap";
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logoutUser } = useContext(UserContext);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    },[user,user?.photoURL]);

    console.log(user);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar
                fixed="top"
                expand="md"
                className="menu"
                style={{
                    borderBottom: "1px solid gray",
                    backgroundColor: "var(--bgColor)",
                }}
            >
                <NavbarBrand href="/">
                    <FaBlog style={{color:"var(--color1)", width:"20px !important", height:"20px !important"}} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/" style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)"}}>
                                Főoldal
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/posts" style={{fontSize:"20px", color:"var(--greyColor)"}}>
                                Posztok
                            </NavLink>
                        </NavItem>
                        {user && (
                            <NavItem>
                                <NavLink className="nav-link" to="/create" style={{fontSize:"20px", color:"var(--greyColor)"}}>
                                    Új bejegyzés
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                    {/* authorizáció*/}
                    <Nav navbar>
                        {!user ? (
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/in" style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)"}}>
                                        Belépés
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/up" style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)"}}>
                                        Regisztráció
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        to="/"
                                        onClick={() => logoutUser()}
                                        style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)"}}
                                    >
                                        Kijelentkezés
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {avatar ? (
                                            <img
                                                className="myavatar"
                                                src={avatar}
                                                alt=""
                                            />
                                        ) : (
                                            <RxAvatar
                                                title={user.displayName}
                                            />
                                        )}
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem>
                                            <NavLink
                                                className="nav-link"
                                                to="/profile"
                                                style={{color:"var(--color2)", fontWeight:"bolder"}}
                                            >
                                                {" "}
                                                Személyes adatok
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    );
};
