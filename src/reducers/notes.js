import * as actionTypes from '../constants/actionTypes'

const initialState = { notes: [], notesShow: [] };

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTES:
            state.notes = action.notes
            let idCate = action.idCate
            if (idCate) {
                if (idCate === 'trash')
                    state.notesShow = state.notes.filter(x => x.deleted)
                else if (idCate === 'clip')
                    state.notesShow = state.notes.filter(x => x.clip)
                else
                    state.notesShow = state.notes.filter(x => {
                        if (x.category && x.category._id === idCate)
                            return true
                        return false
                    })
            }
            else
                state.notesShow = action.notes.filter(x => !x.deleted)
            return { ...state }

        case actionTypes.CHANGE_INDEX_CURRENT_CATEGORY:
            let value = action.value //id cate
            if (value === 0) {
                state.notesShow = state.notes.filter(x => !x.deleted)
            }
            else if (value === 'trash')
                state.notesShow = state.notes.filter(x => x.deleted)
            else if (value === 'clip') {
                state.notesShow = state.notes.filter(x => x.clip)
                state.notesShow = state.notesShow.filter(x => !x.deleted)
            }
            else {
                state.notesShow = state.notes.filter(x => {
                    if (x.deleted)
                        return false
                    if (x.category && x.category._id === value)
                        return true
                    return false
                })
            }
            return { ...state }

        case actionTypes.GET_NOTES_ON_CHANGE_CLIP:
            state.notes.find(x => x._id === action.action.id).clip = action.action.status
            state.notesShow.find(x => x._id === action.action.id).clip = action.action.status
            state.notesShow = state.notesShow.filter(x => !x.deleted)
            return { ...state }

        case actionTypes.GET_NOTES_AFTER_DELETE:
            state.notes =state.notes.filter(x=>x._id !== action.id)
            state.notesShow = state.notesShow.filter(x=>x._id !== action.id)
            return { ...state }
        default:
            return state
    }
}
