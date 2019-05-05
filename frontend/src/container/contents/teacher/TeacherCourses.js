import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap'

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        }
    }

    refreshCourses = () => {
        this.props.app.getAxios(`/teachers/${this.props.match.params.id}/courses`, data => {
            this.setState({ courses: data.courses });
        });
    }

    deleteCourse = (e) => {
        let courseid = e.target.id;
        this.props.app.getAxios(`/courses/${courseid}/delete`, data => {
            this.refreshCourses();
            this.props.app.updateDatabase();
        });
    }

    componentDidMount() {
        this.refreshCourses();
    }

    render() {
        let decks = [], size = 3;
        let courses = this.state.courses;
        for (let i = 0; i < courses.length; i += size) {
            decks.push(courses.slice(i, i + size))
        }
        return (
            <div>
                {
                    !this.props.app.identity || this.props.app.identity === "outsider" ?
                        <Redirect to="/" />
                        :
                        <div>
                            {this.state.courses ? <p>您總共有{this.state.courses.length}筆課程</p> : <p>您目前尚未建立課程</p>}
                            <Link exact to="/courses/new">建立新課程</Link>
                            {
                                decks.map(deck =>
                                    <Row style={{ margin: "0 30px 0 30px" }}>
                                        {
                                            deck.map(course =>
                                                <Col lg={4}>
                                                    <Card style={{ height: '15em', margin: "20px 0 20px 0" }}>
                                                        <Card.Header>{course.subject}</Card.Header>
                                                        <Card.Body>
                                                            <Card.Title>{course.price}</Card.Title>
                                                            <Card.Text>{course.description}</Card.Text>
                                                            <div>
                                                                <Link to={`/courses/${course.id}/edit`}><Button style={{ margin: "0 5px 5px 0" }} variant="success">編輯課程</Button></Link>
                                                                <Button id={course.id} style={{ margin: "0 5px 5px 0" }} variant="danger" onClick={this.deleteCourse}>刪除課程</Button>
                                                            </div>
                                                        </Card.Body>
                                                        <Card.Footer className="text-muted"></Card.Footer>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                )
                            }
                        </div>
                }
            </ div >
        );
    };
}

export default TeacherCourses;
