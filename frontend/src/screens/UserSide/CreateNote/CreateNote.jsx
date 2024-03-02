import React, { useState } from 'react'
import MainScreen from '../../../Components/MainScreen'
import { Button, Card, Container, Form } from 'react-bootstrap'
import ErrorMessage from '../../../Components/ErrorMessage'
import ReactMarkdown from 'react-markdown'
import Loading from '../../../Components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { NOTES_CREATE_REQUEST } from '../../../constants/noteConstants'
import { createNote } from '../../../actions/noteActions'
import { useNavigate } from 'react-router-dom'
import Header from '../../../Components/Header/Header'

function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const noteCreate = useSelector(state => state.noteCreate);
    const { loading, success, error } = noteCreate;



    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (!title || !category || !content) return;
            dispatch(createNote(title, category, content));
            resetHandler();
            navigate('/mynotes')
        } catch (error) {
            console.log(error)

        }
    }
    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }
    return (
        <>
            <Header />
            <MainScreen title='Create a Note'>
                <Container className='px-5 shadow'>
                    <Card className='shadow'>
                        <Card.Header>Create a new Note</Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="title"
                                        value={title}
                                        placeholder="Enter the title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={content}
                                        placeholder="Enter the content"
                                        rows={4}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </Form.Group>
                                {content && (
                                    <Card>
                                        <Card.Header>Note Preview</Card.Header>
                                        <Card.Body>
                                            <ReactMarkdown>{content}</ReactMarkdown>
                                        </Card.Body>
                                    </Card>
                                )}

                                <Form.Group controlId="content">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="content"
                                        value={category}
                                        placeholder="Enter the Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </Form.Group>
                                {loading && success && <Loading size={50} />}
                                <div className='mt-3'>
                                    <Button type="submit" variant="primary">
                                        Create Note
                                    </Button>
                                    <Button className="mx-2" onClick={resetHandler} variant="danger">
                                        Reset Feilds
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>

                        <Card.Footer className="text-muted">
                            Creating on - {new Date().toLocaleDateString()}
                        </Card.Footer>
                    </Card>
                </Container>
            </MainScreen>
        </>
    )
}

export default CreateNote;
