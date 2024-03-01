import React, { useEffect, useState } from 'react'
import MainScreen from '../../Components/MainScreen'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ErrorMessage from '../../Components/ErrorMessage'
import Loading from '../../Components/Loading'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../actions/userActions'

function SetDetail() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector(state => state.updateUser);
    const { error, loading } = updateUser;

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        } else {
            navigate(-1)
        }
    }, [userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(updateProfile({ name, email }));
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainScreen title='EDIT DETAILS'>
            <Container >
                <div className="loginContainer container px-5 w-50 m-auto shadow">
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    {loading && <Loading />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder="Enter password"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
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
    )
}

export default SetDetail
