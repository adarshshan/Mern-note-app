import React, { useEffect, useState } from 'react'
import MainScreen from '../../../Components/MainScreen'
import ErrorMessage from '../../../Components/ErrorMessage'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { updateUserDetails } from '../../../actions/adminAction'
import AdminHeader from '../../../Components/Header/AdminHeader'
import { useRegisterState } from '../../../costomHooks'

function EditUserDetails() {

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

    const { id } = useParams()
    const dispatch = useDispatch();


    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/admin/${id}`);
            console.log(data);
            setName(data.name)
            setEmail(data.email);
            setPic(data.pic);
        }
        fetching();
    }, [id])


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
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails({ id, name, email, password, pic }));
        navigate(-1);
    }
    return (
        <>
            <AdminHeader />
            <MainScreen title='EDIT DETAILS' >
                <div className="loginContainer container w-50 m-auto shadow">
                    {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />} */}
                    <Row className='p-3'>
                        <Col>
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
                                </Form.Group>

                                <Button variant="primary mt-2" type="submit">
                                    save changes
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                            <img className='mt-3' src={pic} alt="///" style={{
                                height: '220px',
                                width: '200px'
                            }} />
                        </Col>
                    </Row>

                </div>
            </MainScreen>
        </>
    )
}

export default EditUserDetails
