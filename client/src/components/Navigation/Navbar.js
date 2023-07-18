// Imports
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

// Import logo image
import logo from "./img/logo-no-background.png";

// NavBar component to navigate between pages
// Takes a ref object as prop to scroll to the UserList component
const NavBar = ({ userListRef }) => {
    // Hooks to navigate between pages and get current page location
    const navigate = useNavigate();
    const location = useLocation();

    // Function to handle the click on 'Users' link
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

    // Return NavBar component
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="flex-column justify-content-center align-items-center"
        >
            {/* Brand logo which redirects to homepage */}
            <Navbar.Brand href="/home">
                <img src={logo} alt="Logo" width="500" height="82" />
            </Navbar.Brand>
            {/* Toggle button for responsive NavBar */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-center"
            >
                {/* Navigation links */}
                <Nav>
                    {/* Link to 'Users' which triggers scrolling to userList */}
                    section
                    <Nav.Link onClick={handleUsersClick} href="/users">
                        Users
                    </Nav.Link>
                    {/* Link to create new user */}
                    <Nav.Link href="/home">Create new User</Nav.Link>
                    {/* Add more links as needed */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
