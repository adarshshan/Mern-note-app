import React, { useEffect, useState } from 'react'
import MainScreen from '../../../Components/MainScreen'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ErrorMessage from '../../../Components/ErrorMessage'
import Loading from '../../../Components/Loading'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../actions/userActions'
import Header from '../../../Components/Header/Header'

function SetPic() {
    const [pic, setPic] = useState('');
    const [picMessage, setPicMessage] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector(state => state.updateUser);
    const { loading, error } = updateUser;

    useEffect(() => {
        if (userInfo) {
            setPic(userInfo.pic)
        }
    }, [userInfo]);
    const submitHandler = (e) => {
        e.preventDefault()
        try {
            dispatch(updateProfile({ pic }));
            navigate(-1);
        } catch (error) {
            console.log(error)
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
        <>
            <Header />
            <MainScreen title='Update photo'>
                <Container>
                    <div className="loginContainer container w-50 m-auto shadow">
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {loading && <Loading />}
                        <div className='d-flex justify-content-center'>
                            <img style={{ width: '50%', }} src={pic} alt="///" />
                        </div>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="file"
                                    placeholder="Enter password"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </Form.Group>
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
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
        </>
    )
}

export default SetPic
