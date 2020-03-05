import * as actionTypes from '../constants/actionTypes'

const initialState = 0;

export default (state = initialState, { type,value,idCate}) => {
    switch (type) {
        case actionTypes.CHANGE_INDEX_CURRENT_CATEGORY:
            state = value
            return state
        case actionTypes.GET_NOTES_SHOW:
            state = idCate
            return state
        default:
            return state
    }
}
