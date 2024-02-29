import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MainScreen from '../../Components/MainScreen';
import { Button, Card, Container, Form } from 'react-bootstrap';
import ErrorMessage from '../../Components/ErrorMessage';
import ReactMarkdown from 'react-markdown';
import Loading from '../../Components/Loading';
import { updateNote } from '../../actions/noteActions';
import axios from 'axios';

function SingleScreen() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`);
            console.log(data);
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }
        fetching();
    }, [id, date]);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const noteUpdate = useSelector(state => state.noteUpdate);
    const { loading, error } = noteUpdate;



    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (!title || !category || !content) return;
            dispatch(updateNote(title, category, content));
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
        <MainScreen title='Edit note'>
            <Container className='px-5 shadow'>
                <Card className='shadow'>
                    <Card.Header>Create a new Note</Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitHandler}>
                            {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
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
                            {/* {loading && success && <Loading size={50} />} */}
                            <div className='mt-3'>
                                <Button type="submit" variant="primary">
                                    Save Changes
                                </Button>
                                <Button className="mx-2" onClick={resetHandler} variant="danger">
                                    Reset Feilds
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="text-muted">
                        Creating on - {date.toString().substring(0, 10)}
                    </Card.Footer>
                </Card>
            </Container>
        </MainScreen>
    )
}

export default SingleScreen;
