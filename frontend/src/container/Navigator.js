import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';
import renderURI from '../renderURI';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.linkstyle = {
            color: "gray",
            textDecoration: 'none'
        };
        this.activeStyle = {
            fontWeight: "bold",
            color: "#0080ff",
        };
        this.dropstyle = {
            color: "black",
            textDecoration: 'none'
        };
    }
    render() {
        return (
            <Navbar bg="white" expand="lg" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }} >
                <Navbar.Brand><NavLink to="/" style={{ color: "black", fontWeight: "bold", textDecoration: 'none' }}>台大轉學生家教平台</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><NavLink exact to="/teachers" style={this.linkstyle} activeStyle={this.activeStyle}>教師</NavLink></Nav.Link>
                        <Nav.Link><NavLink exact to="/about" style={this.linkstyle} activeStyle={this.activeStyle}>關於</NavLink></Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={() => {this.props.app.getAxios("/connection", console.log)}}>連線狀態</Nav.Link>
                        {
                            !this.props.app.name ? <Nav.Link href={renderURI("/auth/google")}>登入（powered by Google）</Nav.Link> :
                                <NavDropdown title={this.props.app.name} id="basic-nav-dropdown" alignRight  >
                                    {
                                        this.props.app.identity === "candidate" && 
                                        <NavDropdown.Item><Link style={this.dropstyle} to="/teachers/new">成為教師</Link></NavDropdown.Item>
                                    }
                                    {
                                        this.props.app.identity === "teacher" && 
                                        <NavDropdown.Item><Link style={this.dropstyle} to={"/teachers/" + this.props.app.teacherid + "/edit"}>管理教師頁面</Link></NavDropdown.Item>
                                    }
                                    {
                                        this.props.app.identity === "teacher" && 
                                        <NavDropdown.Item><Link style={this.dropstyle} to={"/teachers/" + this.props.app.teacherid + "/courses/edit"}>管理課程頁面</Link></NavDropdown.Item>
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.props.app.logout}>登出</NavDropdown.Item>
                                </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };
}

export default Navigator;
