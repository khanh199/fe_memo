import * as types from '../constants/actionTypes';
import callAPI from '../utils/apiCaller';
import auth from '../auth'

export const actGetAuth = () => {
    return {
        type: types.GET_AUTH
    }
}

export const actSetAuthFalse = () => {
    auth.signout()
    return {
        type: types.SET_AUTH_FALSE
    }
}
export const actSetAuthTrue = () => {
    auth.authenticate()
    return {
        type: types.SET_AUTH_TRUE
    }
}

export const actSetProgressTrue = () => {
    return {
        type: types.SET_PROGRESS_TRUE
    }
}
export const actSetProgressFalse = () => {
    return {
        type: types.SET_PROGRESS_FALSE
    }
}

export const actGetCategoriesRequest = () => {
    return (dispatch) => {
        return callAPI(`categories`).then((res) => {
            let categories = res.data.rs.filter(n => n !== null);
            dispatch(actGetCategories(categories));
        }).catch(e => console.log(e));
    }
}

export const actGetCategories = (categories) => {
    return {
        type: types.GET_CATEGORIES,
        categories
    }
}

export const actGetNotesRequest = () => {
    return (dispatch) => {
        return callAPI(`notes/get-all`).then((res) => {
            let Notes = res.data.rs.filter(n => n !== null);
            dispatch(actGetNotes(Notes));
        }).catch(e => console.log(e));
    }
}

export const actGetNotesRequestAndIdCate = (idCate) => {
    return (dispatch) => {
        dispatch(actSetCategoryIndex(idCate))
        return callAPI(`notes/get-all`).then((res) => {
            let Notes = res.data.rs.filter(n => n !== null);
            dispatch(actGetNotesAndIdCate(Notes, idCate));
        }).catch(e => console.log(e));
    }
}

export const actGetNotes = (notes) => {
    return {
        type: types.GET_NOTES,
        notes
    }
}
export const actGetNotesAndIdCate = (notes, idCate) => {
    return {
        type: types.GET_NOTES,
        notes,
        idCate
    }
}


export const actNewNote = (data) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`notes/new-note`, 'POST', data)
            .then((res) => {
                dispatch(actGetNotesRequest())
                dispatch(actSetProgressFalse())
            }).catch(e => console.log(e));
    }
}

export const actEditNote = (data) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`notes/edit/${data.id}`, 'PATCH', data)
            .then((res) => {
                dispatch(actGetNotesRequestAndIdCate(data.category ? data.category : 0))
                dispatch(actSetProgressFalse())
            }).catch(e =>  dispatch(actSetProgressFalse()));
    }
}

export const actChangeIdCate = (data) => {
    return (dispatch) => {
        return callAPI(`notes/change-idcate/${data.idMemo}`, 'PATCH', data)
            .then((res) => {
                dispatch(actGetNotesRequestAndIdCate(data.idCate ? data.idCate : 0))
            }).catch(e => console.log(e));
    }
}

export const actSetNoteIndex = (value) => {
    return {
        type: types.CHANGE_INDEX_CURRENT_MEMO,
        value
    }
}

export const actSetCategoryIndex = (value) => {
    return {
        type: types.CHANGE_INDEX_CURRENT_CATEGORY,
        value
    }
}

export const actNewCategory = (data) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`categories/new-cate`, 'POST', data)
            .then((res) => {
                dispatch(actGetCategoriesRequest())
                dispatch(actSetProgressFalse())
            }).catch(e =>  dispatch(actSetProgressFalse()));
    }
}

export const actEditCategory = (data) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`categories/edit/${data.id}`, 'PATCH', data)
            .then((res) => {
                dispatch(actGetCategoriesRequest())
                dispatch(actSetProgressFalse())
            }).catch(e => dispatch(actSetProgressFalse()))
    }
}

export const actDeleteCategory = (id) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`categories/${id}`, 'DELETE')
            .then((res) => {
                dispatch(actGetCategoriesRequest())
                dispatch(actSetProgressFalse())
            }).catch(e => {
                dispatch(actSetProgressFalse())
            });
    }
}


export const actGetNotesOnChangeClip = (action) => {
    return {
        type: types.GET_NOTES_ON_CHANGE_CLIP,
        action
    }
}
export const actSetClip = (status, id) => {
    if (status)
        return (dispatch) => {
            dispatch(actGetNotesOnChangeClip({ status, id }))
            return callAPI(`notes/set-clip-true/${id}`, 'PATCH')
                .then((res) => {
                }).catch(e => console.log(e));
        }
    else
        return (dispatch) => {
            dispatch(actGetNotesOnChangeClip({ status, id }))
            return callAPI(`notes/set-clip-false/${id}`, 'PATCH')
                .then((res) => {
                }).catch(e => console.log(e));
        }
}

export const actDeleteNoteToTrash = (id) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`notes/delete_to_trash/${id}`, 'PATCH')
            .then((res) => {
                dispatch(actGetNotesRequestAndIdCate('trash'))
                dispatch(actSetProgressFalse())
            }).catch(e => console.log(e));
    }
}

export const actRestoreNote = (id) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        return callAPI(`notes/restore/${id}`, 'PATCH')
            .then((res) => {
                dispatch(actGetNotesRequestAndIdCate(0))
                dispatch(actSetProgressFalse())
            }).catch(e => console.log(e));
    }
}

export const actGetNotesAfterDelete = (id) => {
    return {
        type: types.GET_NOTES_AFTER_DELETE,
        id
    }
}

export const actDeleteNote = (id) => {
    return (dispatch) => {
        dispatch(actSetProgressTrue())
        dispatch(actGetNotesAfterDelete(id))
        return callAPI(`notes/delete/${id}`, 'DELETE')
            .then((res) => {
                dispatch(actSetProgressFalse())
            }).catch(e => console.log(e));
    }
}