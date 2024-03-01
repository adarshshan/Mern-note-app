import React from "react";
import './Header.css'
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

function Header({ setSearch }) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const logoutHandler = () => {
        try {
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" className="header-cute" variant="dark">
            <Container>
                <Navbar.Brand className="fs-2"> <Link to='/'>My <span className="text-dark fw-bold">Note</span></Link></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    {
                        userInfo ? (<Nav>
                            <Nav.Link> <Link to='/mynotes'>My Notes</Link></Nav.Link>
                            <NavDropdown title={userInfo?.name} id="collasible-nav-dropdown" >
                                <NavDropdown.Item href="/profile">
                                    <Link to='/profile'>My Profile</Link>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler} >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>) : (<Nav><Nav.Link><Link to='/login'>Login</Link></Nav.Link></Nav>)
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;