import {createStore} from 'redux';
import { combineReducers } from 'redux';

const breakLengthReducer = (state = 5, action) => {
    switch(action.type) {
        case 'INCBREAK':
            return state + 1;
            break;
        case 'DECBREAK':
            return state - 1;
            break;
        case 'RESET':
            return action.defaultBreakLength;
            break;
        default:
            return state;
            break;
    }
}
const sessionLengthReducer = (state = 25, action) => {
    switch(action.type) {
        case 'INCSESSION':
            return state + 1;
            break;
        case 'DECSESSION':
            return state - 1;
            break;
        case 'RESET':
            return action.defaultSessionLength;
            break;
        default: 
            return state;
            break;
    }
}

const breakReducer = (state = 5*60, action) => {
    switch(action.type) {
        case 'COUNTBREAK':
            return action.payload;
            break;
        case 'SETBREAK':
            return action.payload;
            break;
        case 'RESET':
            return action.defaultBreakCount;
            break;
        default:
            return state;
    }
}
const sessionReducer = (state = 25*60, action) => {
    switch(action.type) {
        case 'COUNTSESSION':
            return action.payload;
            break;
        case 'SETSESSION':
            return action.payload;
            break;
        case 'RESET':
            return action.defaultSessionCount;
            break;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    breakLength: breakLengthReducer,
    sessionLength: sessionLengthReducer,
    break: breakReducer,
    session: sessionReducer,
})

const store = createStore(allReducers);

export default store;