import { combineReducers } from 'redux';
import userDataReducer from './userData';
import collectionDataReducer from './collectionData';
import noteDataReducer from './noteData';
import isLoggedInReducer from './isLoggedIn';
import viewReducer from './view';

const rootReducer = combineReducers({
    userData: userDataReducer,
    collectionData: collectionDataReducer,
    noteData: noteDataReducer,
    isLoggedIn: isLoggedInReducer,
    view: viewReducer
})

export default rootReducer