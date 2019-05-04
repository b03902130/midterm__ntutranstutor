import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardDeck, Button, Container, Row, Col } from 'react-bootstrap'

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        }
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/courses", data => {
            this.setState({ courses: data.courses });
        });
    }

    render() {
        let decks = [], size = 3;
        let courses = this.state.courses;
        for (let i = 0; i < courses.length; i += size) {
            decks.push(courses.slice(i, i + size))
        }
        return (
            <div>
                {this.state.courses ? <p>您總共有{this.state.courses.length}筆課程</p> : <p>您目前尚未建立課程</p>}
                <Link exact to="/courses/new">建立新課程</Link>
                {
                    decks.map(deck =>
                        <Row>
                            {
                                deck.map(course =>
                                    <Col sm={4}>
                                        <Card style={{ height: '15em' }}>
                                            <Card.Body>
                                                <Card.Title>{course.subject}</Card.Title>
                                                <Card.Subtitle>{course.price}</Card.Subtitle>
                                                <Card.Text>{course.description}</Card.Text>
                                                <div>
                                                    <Link to={`/courses/${course.courseid}/edit`}><Button style={{margin: "0 5px 5px 0"}} variant="success">編輯課程</Button></Link>
                                                    <Link to={`/courses/${course.courseid}/delete`}><Button style={{margin: "0 5px 5px 0"}}  variant="danger">刪除課程</Button></Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    )
                }
            </ div >
        );
    };
}

export default TeacherCourses;
