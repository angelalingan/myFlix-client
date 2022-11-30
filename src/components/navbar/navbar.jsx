import React from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar.scss";

export default function MyFlixNavBar({ user, onLogOut }) {
    return (
        <Navbar className="px-0 navBar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Nav className="me-auto">
                    {user && (
                        <>
                            <Nav.Link as={Link} to={`/users/${user}`}>
                                Profile
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={onLogOut}>
                                Logout
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}