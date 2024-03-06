import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../actions/misc'

function Sample(props) {
    // const dispatch = useDispatch()
    // const countRed = useSelector(state => state.countReducer);
    return (
        <div className='d-flex border-2 shadow p-3'>
            <button onClick={() => props.addCount()}>increment</button>
            <h1>{props.count}</h1>
            <button onClick={() => props.decreaseCount()}>decrement</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { count: state.countReducer.count }
}
const mapDispatchToprops = (dispatch) => {
    return {
        addCount: () => dispatch(increment()),
        decreaseCount: () => dispatch(decrement())
    }
}
export default connect(mapStateToProps, mapDispatchToprops)(Sample)
