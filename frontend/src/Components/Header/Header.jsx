import React from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand> <Link to='/'>Note Zipper</Link></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link> <Link to='/mynotes'>My Notes</Link></Nav.Link>
                        <NavDropdown title='Adarsh' id="collasible-nav-dropdown" >
                            <NavDropdown.Item href="/profile">
                                <Link to='/profile'>My Profile</Link>
                            </NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => {
                                localStorage.removeItem("userInfo")
                                navigate('/');
                            }} >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;