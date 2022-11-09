import React from "react";
import PropTypes from "prop-types";

import { Button, Col, Container, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container className="director-view">
                <Row>
                    <Col className="label">Director: </Col>
                    <Col className="value">{director.Name}</Col>
                </Row>
                <Row>
                    <Col className="label">Bio: </Col>
                    <Col className="value">{director.Bio}</Col>
                </Row>
                <Row>
                    <Col className="label">Birth: </Col>
                    <Col className="value">{director.Birth}</Col>
                </Row>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </Container>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
    }).isRequired,
};