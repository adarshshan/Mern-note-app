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
import { adminLogout } from "../../actions/adminAction";

function AdminHeader(props) {
    const dispatch = useDispatch();
    const adminLogin = useSelector(state => state.adminLogin);
    const { adminInfo } = adminLogin;
    const logoutHandler = () => {
        try {
            dispatch(adminLogout());
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fs-2"> <Link to='/get-list'>ADMIN <span className="text-dark fw-bold">PANAL</span></Link></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline>
                            {props.setSearch && <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={(e) => props.setSearch(e.target.value)}
                            />}

                        </Form>
                    </Nav>
                    {
                        adminInfo ? (<Nav>
                            <Nav.Link> <Link to='/add-user'>Add user</Link></Nav.Link>
                            <NavDropdown title={adminInfo?.name} id="collasible-nav-dropdown" >
                                <NavDropdown.Item href="#">
                                    Profile
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler} >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>) : (<Nav><Nav.Link><Link to='/admin-login'>Login</Link></Nav.Link></Nav>)
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;