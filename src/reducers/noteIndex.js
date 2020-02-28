import * as actionTypes from '../constants/actionTypes'

const initialState = 0;

export default (state = initialState, { type,value}) => {
    switch (type) {
        case actionTypes.CHANGE_INDEX_CURRENT_MEMO:
            state = value
            return state
        default:
            return state
    }
}
