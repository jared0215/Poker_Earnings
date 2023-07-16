import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ userListRef }) => {
    const handleUsersClick = (event) => {
        event.preventDefault();

        // Scroll to the UserList
        userListRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="flex-row px-5">
            <Navbar.Brand href="#home">Poker Earnings Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link onClick={handleUsersClick} href="/users">
                        Users
                    </Nav.Link>
                    <Nav.Link href="/poker">Poker Games</Nav.Link>
                    {/* Add more links as needed */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
