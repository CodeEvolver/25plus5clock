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
        default: 
            return state;
            break;
    }
}

const breakReducer = (state = 5, action) => {
    return state;
}
const sessionReducer = (state = 25, action) => {
    return state
}
const timeReducer = (state=25, action) => {
    //const countDown = action.countDown * 60 * 1000;
    switch(action.type) {
        case 'START':
            //setInterval(()=> {return state-1}, 3000);
            return state-1;
            break;
        case 'PAUSE':
            return state;
            break;
        default:
            return state;
    }
}
const playPauseReducer = (state=false, action) => {
    switch(action.type) {
        case 'START':
            return !state;
        case 'PAUSE':
            return !state;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    breakLength: breakLengthReducer,
    sessionLength: sessionLengthReducer,
    break: breakReducer,
    session: sessionReducer,
    count: timeReducer,
    playPause: playPauseReducer,
})

const store = createStore(allReducers);

export default store;