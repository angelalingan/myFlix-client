import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    //added a movies state that will hold the list of movies
    constructor() {
        super();
        this.setstate = {
            movies: [
                /*
                {
                    _id: "6348b82cba5d8d49f5421101",
                    Title: "Titanic",
                    Description: "A 1997 American epic romance and disaster film, based on accounts of the sinking of the RMS Titanic.",
                    Genre: {
                        Name: "Drama",
                        Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
                    },
                    Director: {
                        Name: "James Cameron",
                        Bio: "A Canadian filmmaker. Best known for making science fiction and epic films",
                        Birth: "August 16, 1954",
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg",
                    Featured: true,
                },
                {
                    _id: "6348b94aba5d8d49f542110",
                    Title: "Avatar",
                    Description: "A 2009 American epic science fiction film set in the mid-22nd century when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the valuable mineral unobtanium.",
                    Genre: {
                        Name: "Science fiction",
                        Description: "A genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity.",
                    },
                    Director: {
                        Name: "James Cameron",
                        Bio: "A Canadian filmmaker. Best known for making science fiction and epic films.",
                        Birth: "August 16, 1954",
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_FMjpg_UX1000_.jpg",
                    Featured: true,
                },
                {
                    _id: "6348ba10ba5d8d49f5421103",
                    Title: "The Batman",
                    Description: "A 2022 American superhero film based on the DC Comics character Batman",
                    Genre: {
                        Name: "Action",
                        Description: "A film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
                    },
                    Director: {
                        Name: "Matt Reeves",
                        Bio: "An American film director, producer and screenwriter.",
                        Birth: "April 27, 1966",
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
                    Featured: false,
                }
                */
            ]
        }
    }

    componentDidMount() {
        axios.get('https://myflixdb-myfirstapi.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        //if (selectedMovie) return <MovieView movie={selectedMovie} />; 

        if (movies.length === 0) return <div className="main-view" />; //<div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
        return (
            <div className="main-view">
                <div>Titanic</div>
                <div>Avatar</div>
                <div>The Batman</div>
            </div>
        );
    }
}