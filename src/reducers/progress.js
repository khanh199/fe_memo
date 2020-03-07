import * as actionTypes from '../constants/actionTypes'

const initialState = false;

export default (state = initialState, { type}) => {
    switch (type) {
        case actionTypes.SET_PROGRESS_FALSE:
            state = false
            return state
        case actionTypes.SET_PROGRESS_TRUE:
            state = true
            return state
        default:
            return state
    }
}
