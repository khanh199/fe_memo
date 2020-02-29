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
            console.log(Notes);
            
            dispatch(actGetNotes(Notes));
        }).catch(e => console.log(e));
    }
}

export const actGetNotes = (notes) => {
    return {
        type: types.GET_NOTES,
        notes
    }
}

export const actNewNote = (data) => {
    return (dispatch) => {
        return callAPI(`notes/new-note`, 'POST', data)
            .then((res) => {
                dispatch(actGetNotesRequest())
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
        return callAPI(`categories/new-cate`, 'POST', data)
            .then((res) => {
                dispatch(actGetCategoriesRequest())
            }).catch(e => console.log(e));
    }
}

export const actEditCategory = (data) => {
    return (dispatch) => {
        return callAPI(`categories/edit/${data.id}`, 'PATCH', data)
            .then((res) => {
                dispatch(actGetCategoriesRequest())
            }).catch(e => console.log(e));
    }
}