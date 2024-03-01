import React, { useEffect, useLayoutEffect, useState } from 'react'
import '../../UserSide/LoginScreen/LoginScreen.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../Components/ErrorMessage';
import Loading from '../../../Components/Loading';
import MainScreen from '../../../Components/MainScreen';
import { LoginAdmin } from '../../../actions/adminAction';


function AdminLoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const adminLogin = useSelector((state) => state.adminLogin);
    const { loading, error } = adminLogin;

    const adminInfo = localStorage.getItem("adminInfo");

    useLayoutEffect(() => {
        if (adminInfo) {
            navigate('/get-list');
        }
    }, [adminInfo]);


    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(LoginAdmin({ email, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <MainScreen title='Admin Login'>
                <Container>
                    <div className="loginContainer container w-50 m-auto shadow">
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {loading && <Loading />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary mt-2" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Row className="py-3">
                            <Col>
                                New Customer ? <Link to="/register" className='text-primary'>Register Here</Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </MainScreen>
        </>
    )
}

export default AdminLoginScreen
