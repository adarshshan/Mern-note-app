import React, { useEffect, useLayoutEffect, useState } from 'react'
import './MyNotes.css'
import MainScreen from '../../../Components/MainScreen'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, listNotes } from '../../../actions/noteActions'
import Loading from '../../../Components/Loading'
import ErrorMessage from '../../../Components/ErrorMessage'
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";



const MyNotes = ({ search }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const noteList = useSelector((state) => state.noteList);
    const userLogin = useSelector((state) => state.userLogin);
    const noteCreate = useSelector((state) => state.noteCreate);
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading, notes, error } = noteList;
    const { userInfo } = userLogin;
    const { success: successCreate } = noteCreate;
    const { success: successUpdate } = noteUpdate;
    const { success: successDelete } = noteDelete;
    useLayoutEffect(() => {
        dispatch(listNotes());
        if (!userInfo) navigate('/');
    }, [dispatch, userInfo, successCreate, deleteNote, successUpdate, successDelete]);
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteNote(id))
        }
    }
    return (
        <>
            <MainScreen title={`Welcome back ${userInfo?.name}`} className='px-5 mx-5 shadow'>
                <Link to='/createnote'>
                    <Button className='create-btn' style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>Create New Note</Button>
                </Link>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                {
                    notes?.reverse()
                        .filter(filteredNote => filteredNote.title.toLowerCase().includes(search.toLowerCase()))
                        .map((note) => {
                            return (
                                <Accordion key={note._id}>
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
                                                    <Button className='create-btn'><Link to={`/note/${note._id}`}><FiEdit /></Link></Button>
                                                    <Button onClick={() => deleteHandler(note._id)} variant='danger' className='mx-2'>
                                                        <AiOutlineDelete />
                                                    </Button>
                                                </div>
                                            </Card.Header>
                                            <Accordion.Body eventKey='0'>
                                                <Card.Body>
                                                    <h4>
                                                        <Badge className='bg-success text-white'> Category - {note.category} </Badge>
                                                    </h4>
                                                    <blockquote className="blockquote mb-0">
                                                        <p> {note.content} </p>
                                                        <footer className="blockquote-footer"> Created on - {note.createdAt.substring(0, 10)} </footer>
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
