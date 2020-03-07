import { combineReducers } from 'redux';
import auth from './auth'
import categories from './categories'
import notes from './notes'
import noteIndex from './noteIndex'
import categoryIndex from './categoryIndex'
import progress from './progress'

const appReducers = combineReducers({
    auth,
    categories,
    notes,
    noteIndex,
    categoryIndex,
    progress
})

export default appReducers;