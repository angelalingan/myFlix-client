import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, onRemoveFavorite }) {
    return (
        <Card className="mb-3 favMovies">
            <Card.Body>
                <Row>
                    <Col>
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
                        return (
                            <Col sm={12} md={6} lg={4} className="mt-3" key={`fav-${_id}`}>
                                <Figure>
                                    <Link to={`/movies/${_id}`}>
                                        <Figure.Image src={ImagePath} alt={Title} />
                                        <Figure.Caption>{Title}</Figure.Caption>
                                    </Link>
                                </Figure>
                                <Button variant="warning" onClick={() => onRemoveFavorite(_id)}>
                                    Remove
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default FavoriteMovies;