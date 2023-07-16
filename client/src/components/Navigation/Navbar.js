import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "./img/logo-no-background.png";

const NavBar = ({ userListRef }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleUsersClick = (e) => {
        e.preventDefault();

        if (location.pathname === "/home") {
            // If we are already on the homepage, directly scroll to the UserList
            userListRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
            // Redirect to the homepage
            navigate("/home");

            // Scroll to the UserList after a short delay to allow the page to redirect
            setTimeout(() => {
                userListRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        }
    };

    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="flex-column justify-content-center align-items-center"
        >
            <Navbar.Brand href="/home">
                <img src={logo} alt="Logo" width="500" height="82" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-center"
            >
                <Nav>
                    <Nav.Link onClick={handleUsersClick} href="/users">
                        Users
                    </Nav.Link>
                    <Nav.Link href="/home">Create new User</Nav.Link>
                    {/* Add more links as needed */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
