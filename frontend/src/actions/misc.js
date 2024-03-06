
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const increment = () => (dispatch) => {
    dispatch({
        type: INCREMENT,
        payload: 2
    });
}
const decrement = () => (dispatch) => {
    dispatch({
        type: DECREMENT,
        payload: 2
    });
}
const initialState = {
    count: 0
}

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + action.payload
            }
        case DECREMENT:
            return {
                count: state.count - action.payload
            }
        default:
            return state;
    }
}

export { increment, decrement, countReducer }