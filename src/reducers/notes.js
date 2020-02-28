import * as actionTypes from '../constants/actionTypes'

const initialState = [];

export default (state = initialState, {type,notes}) => {
    switch (type) {
        case actionTypes.GET_NOTES:
            state = notes
            return [...state]
        default:
            return state
    }
}
