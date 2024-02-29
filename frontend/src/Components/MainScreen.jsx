import React from 'react'
import './MainScreen.css'
import { Container, Row } from 'react-bootstrap'

function MainScreen({ title, children }) {
    return (
        <div className='mainback'>
            <Container>
                <Row>
                    <div className="page">
                        {title && <>
                            <h2 className='heading '>{title}</h2>
                            <hr />
                        </>
                        }
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MainScreen
