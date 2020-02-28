import * as actionTypes from '../constants/actionTypes'

const initialState = [];

export default (state = initialState, {type,categories}) => {
    switch (type) {
        case actionTypes.GET_CATEGORIES:
            state = categories
            return [...state]
        default:
            return state
    }
}
