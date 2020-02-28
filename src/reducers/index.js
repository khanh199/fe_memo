import { combineReducers } from 'redux';
import auth from './auth'
import categories from './categories'
import notes from './notes'
import noteIndex from './noteIndex'
import categoryIndex from './categoryIndex'

const appReducers = combineReducers({
    auth,
    categories,
    notes,
    noteIndex,
    categoryIndex
})

export default appReducers;