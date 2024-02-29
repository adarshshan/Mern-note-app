import React, { useEffect, useState } from 'react'
import './LoginScreen.css';
import MainScreen from '../../Components/MainScreen'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo]);


    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(login(email, password));
            // navigate('/mynotes');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <MainScreen title='Login'>
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

export default LoginScreen
