import React, { useEffect, useState } from 'react'
import MainScreen from '../../../Components/MainScreen';
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../../../Components/ErrorMessage';
import Loading from '../../../Components/Loading';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../actions/userActions';
import { useRegisterState } from '../../../costomHooks';

function ProfileScreen() {
    const [
        email, setEmail,
        name, setName,
        pic, setPic,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        message, setMessage,
        picMessage, setPicMessage
    ] = useRegisterState();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector(state => state.updateUser);
    const { loading, success, error } = updateUser;

    useEffect(() => {
        if (userInfo) {
            setPic(userInfo.pic);
            setName(userInfo.name);
            setEmail(userInfo.email);
        } else {
            navigate('/')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                dispatch(updateProfile({ name, email, pic, password }))
            } else {
                alert('passwords are not matching!');
            }

        } catch (error) {
            console.log(error);
        }
    }
    const postDetails = (pics) => {
        if (!pics) return setPicMessage('Please Select an image!');
        setPicMessage(null);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
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
        <MainScreen title='EDIT PROFILE'>
            <div className='container shadow ' style={{ alignItems: 'center' }}>
                <Row className='profileContainer container'>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Form.Group controlId="pic">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control id="custom-file"
                                    type="file"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    label="upload Profile Picture"
                                    custom />
                            </Form.Group>
                            <Button type="submit" varient="primary" className='mt-3'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <img src={pic} alt="///" className='profilePic' />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
