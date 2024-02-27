import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import MainScreen from '../../Components/MainScreen';
import ErrorMessage from '../../Components/ErrorMessage'
import Loading from '../../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password do not match!')
        } else {
            dispatch(register(name, email, password, pic));
        }
    }
    const postDetails = (pics) => {
        if (!pics) return setPicMessage('Please Select an image!');
        setPicMessage(null);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            console.log('reached here');
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'noteziper')
            data.append('cloud_name', 'dnn1ree80')
            fetch("https://api.cloudinary.com/v1_1/dnn1ree80/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setPicMessage('please select a valid image.');
        }
    }
    return (
        <>
            <MainScreen title='REGISTER' >
                <div className="loginContainer">
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                    {loading && <Loading />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        {picMessage && (
                            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                        )}
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control id="custom-file"
                                type="file"
                                onChange={(e) => postDetails(e.target.files[0])}
                                label="upload Profile Picture"
                                custom />
                            {/* <FormFile
                                // onChange={(e) => postDetails(e.target.files[0])}
                                id="custom-file"
                                type="image/png"
                                label="Upload Profile Picture"
                                custom
                            /> */}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            Have an Account ? <Link to="/login">Login</Link>
                        </Col>
                    </Row>
                </div>
            </MainScreen>
        </>
    )
}

export default RegisterScreen
