import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    // Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be 5 or more characters');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be 6 or more characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Email must be a valid email address');
            isReq = false;
        }

        return isReq;
    };

    //const handleSubmit = (e) => {
    //    e.preventDefault();
    //    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    //   props.onRegistration(username);
    //};

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios
                .post('https://myflixdb-myfirstapi.herokuapp.com/users', {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                })
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful! Please login.');
                    window.open('/', '_self');
                })
                .catch((response) => {
                    console.error(e);
                    alert('Unable to register');
                });
        }
    };

    return (
        <form>
            <h1>New User Registration</h1>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {emailErr && <p>{emailErr}</p>}
            </label>
            <label>
                Birthday:
                <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                {birthdayErr && <p>{birthdayErr}</p>}
            </label>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
    //onRegistration: PropTypes.func.isRequired,
};