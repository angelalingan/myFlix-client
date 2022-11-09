import React from "react";
import PropTypes from "prop-types";

import { Button, Col, Container, Row } from "react-bootstrap";



export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;

        return (
            <Container className="genre-view">
                <Row>
                    <Col className="label">Genre: </Col>
                    <Col className="value">{genre.Name}</Col>
                </Row>
                <Row>
                    <Col className="label">Description: </Col>
                    <Col className="value">{genre.Description}</Col>
                </Row>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};