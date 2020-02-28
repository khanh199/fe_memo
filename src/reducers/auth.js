import * as actionTypes from '../constants/actionTypes'

const initialState = false;

export default (state = initialState, { type}) => {
    switch (type) {
        case actionTypes.GET_AUTH:
            return state
        case actionTypes.SET_AUTH_FALSE:
            state = false
            return state
        case actionTypes.SET_AUTH_TRUE:
            state = true
            return state
        default:
            return state
    }
}
