import { combineReducers } from 'redux';
import auth from './auth'
import categories from './categories'
import notes from './notes'
import noteIndex from './noteIndex'


const appReducers = combineReducers({
    auth,
    categories,
    notes,
    noteIndex
})

export default appReducers;