import React, { useState } from 'react'
import MainScreen from '../../Components/MainScreen'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ErrorMessage from '../../Components/ErrorMessage'
import Loading from '../../Components/Loading'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../actions/userActions'

function SetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const updateUser = useSelector(state => state.updateUser);
    const { loading, error } = updateUser;

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setErrormsg('passwords are not matching!')
            } else {
                setErrormsg('');
                dispatch(updateProfile({ password }));
                navigate('/profile');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <MainScreen title='Create New password'>
                <Container>
                    <div className="loginContainer container w-50 m-auto shadow">
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {errormsg && <ErrorMessage variant='danger'>{errormsg}</ErrorMessage>}
                        {loading && <Loading />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary mt-2" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Row className="py-3">
                            <Col>
                                <Button onClick={() => navigate(-1)}><IoMdArrowRoundBack /></Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </MainScreen>
        </div>
    )
}

export default SetPassword
