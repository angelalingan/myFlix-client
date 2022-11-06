import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} width="350" height="500" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <h6>Genre:
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">{movie.Genre.Name}</Button>
                        </Link>
                    </h6>
                </div>
                <div className="movie-director">
                    <h6>Director:
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant='link'>{movie.Director.Name}</Button>
                        </Link>
                    </h6>
                </div>


                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}