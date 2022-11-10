import React, { useState, useEffect } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row, } from "react-bootstrap";

import "./profile-view.scss";

function UpdateUser({ handleSubmit, handleUpdate, user }) {
    const [userName, setUserName] = useState(user.Username);
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState(user.Email);

    return (
        <>
            <h2>Want to change some info?</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        name="Username"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Your password must have 8 or more characters"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                    />
                </Form.Group>
                <Button
                    className="mt-2"
                    variant="info"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit({
                            userName,
                            newPassword,
                            email,
                        });
                    }}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default UpdateUser;