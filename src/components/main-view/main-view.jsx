import React from 'react';
import axios from 'axios'; //importing axios library to fetch movies from database
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from "../profile-view/profile-view";
import MyFlixNavbar from "../navbar/navbar";

export class MainView extends React.Component {

    //added a movies state that will hold the list of movies
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: true,
        };
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //When a user successfully registers
    onRegistration(register) {
        this.setState({
            register,
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://myflixdb-myfirstapi.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onRegistration(registered) {
        this.setState({
            registered,
        });
    }

    handleFavorite = (movieId, action) => {
        const { user, favoriteMovies } = this.state;
        const accessToken = localStorage.getItem("token");
        const username = user;
        if (accessToken !== null && username !== null) {
            // Add MovieID to Favorites (local state & webserver)
            if (action === "add") {
                this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
                axios
                    .put(
                        `https://myflixdb-myfirstapi.herokuapp.com/users/${username}/movies/${movieId}`,
                        {},
                        {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    )
                    .then((res) => {
                        console.log(`Movie added to ${username} Favorite movies`);
                        alert(`Movie added to ${username} Favorite movies`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // Remove MovieID from Favorites (local state & webserver)
            } else if (action === "remove") {
                this.setState({
                    favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
                });
                axios
                    .delete(
                        `https://myflixdb-myfirstapi.herokuapp.com/users/${username}/favorites/${movieId}`,
                        {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    )
                    .then((res) => {
                        console.log(`Movie removed from ${username} Favorite movies`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    };

    render() {
        const { movies, selectedMovie, user, register, favoriteMovies } = this.state;

        if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

        return (
            <Router>
                <MyFlixNavbar user={user} onLogOut={() => this.onLoggedOut()} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>)
                        if (movies.length === 0) return <div className="main-view"></div>
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return
                        <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>)
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path='/users/:username' render={({ match, history }) => {
                        if (!user) return
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        if (movies.length === 0) return <div className="main-view" />;
                        return <ProfileView history={history} movies={movies} user={user === match.params.username} />
                    }} />
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}