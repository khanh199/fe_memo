import * as actionTypes from '../constants/actionTypes'

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTES:
            state = action.notes
            return [...state]
        case actionTypes.GET_NOTES_ON_CHANGE_CLIP:
            state.find(x=>x._id === action.action.id).clip = action.action.status
            return [...state]
        default:
            return state
    }
}
