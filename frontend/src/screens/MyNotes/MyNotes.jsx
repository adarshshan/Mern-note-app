import React, { useEffect, useState } from 'react'
import './MyNotes.css'
import MainScreen from '../../Components/MainScreen'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import notes from '../../data/note'
import axios from 'axios'


const MyNotes = () => {
    const [state, setState] = useState([])
    const fetchNotes = async () => {
        const data = await axios.get('/api/notes');
        setState(data);
        console.log(data)
    }
    useEffect(() => {
        fetchNotes();
    }, [])
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {

        }
    }
    return (
        <>
            <MainScreen title='Welcome adarsh' >
                <Link to='createnote'>
                    <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>Create New Note</Button>
                </Link>
                {
                    notes.map((note) => {
                        return (
                            <Accordion>
                                <Accordion.Item eventKey='0'>
                                    <Card style={{ margin: 10 }}>
                                        <Card.Header style={{ display: 'flex' }}>
                                            <span style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                flex: 1,
                                                cursor: 'pointer',
                                                alignSelf: 'center',
                                                fontSize: 18,
                                            }}>
                                                <Accordion.Header className='hk'> {note.title} </Accordion.Header>
                                            </span>

                                            <div>
                                                <Button><Link to={`/note/${note._id}`}>Edit</Link></Button>
                                                <Button onClick={() => deleteHandler(note._id)} variant='danger' className='mx-2'>Delete</Button>
                                            </div>
                                        </Card.Header>
                                        <Accordion.Body eventKey='0'>
                                            <Card.Body>
                                                <h4>
                                                    <Badge className='bg-success text-white'> Category - {note.category} </Badge>
                                                </h4>
                                                <blockquote className="blockquote mb-0">
                                                    <p> {note.content} </p>
                                                    <footer className="blockquote-footer"> Created on - Date </footer>
                                                </blockquote>
                                            </Card.Body>
                                        </Accordion.Body>

                                    </Card>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })
                }
            </MainScreen>
        </>
    )
}

export default MyNotes
