import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BreakIcon from './Assets/icons8-break.svg';
import FocusIcon from './Assets/icons8-focus.svg';
import DownIcon from './Assets/icons8-down.svg';
import UpIcon from './Assets/icons8-up.svg';
import StartIcon from './Assets/icons8-play.svg';
import PauseIcon from './Assets/icons8-stop (1).svg';
import ResetIcon from './Assets/icons8-reset.svg';
import TimerIcon from './Assets/icons8-timer (1).svg';

function App() {
  const [isPaused, setIsPaused] = useState(true);

  const dispatch = useDispatch();
  const breakLength = useSelector((state)=> state.breakLength);
  const sessionLength = useSelector((state)=> state.sessionLength);
  const sessionCount = useSelector((state)=> state.session);
  const breakCount = useSelector((state)=> state.break);


  const incBreakLength = () => {
    breakLength+1 <= 60 && isPaused && dispatch({type:'INCBREAK'});
  }
  const decBreakLength = () => {
    breakLength-1 > 0 && isPaused && dispatch({type:'DECBREAK'});
  }
  const incSessionLength = () => {
    sessionLength+1 <= 60 && isPaused && dispatch({type:'INCSESSION'});
  }
  const decSessionLength = () => {
    sessionLength-1 > 0 && isPaused && dispatch({type:'DECSESSION'});
  }

  useEffect(()=>{
    if(isPaused) {
      dispatch({type:'SETSESSION', payload:sessionLength*60})
      dispatch({type:'SETBREAK', payload:breakLength*60})
    }
  }, [dispatch, sessionLength, breakLength])

  useEffect(()=> {
    let interval;
    let sessionDuration = sessionCount;
    let breakDuration = breakCount;

    const updateSessionCount = () => {
      if(!isPaused) {
        sessionDuration-=1;
        dispatch({
          type:'COUNTSESSION',
          payload:sessionDuration,
        })
        if(sessionDuration <= 0){
          clearInterval(interval);
        }
      }
    }
    const updateBreakCount = () => {
      if(!isPaused) {
        breakDuration-=1;
        dispatch({
          type:'COUNTBREAK',
          payload:breakDuration,
        })
        if(breakDuration===0){
          clearInterval(interval);
          dispatch({
            type: 'RESET',
            defaultSessionCount: 25*60,
            defaultBreakCount: 5*60
          })
        }
      }
    }

    if(sessionDuration >= 0) {
      interval = setInterval(updateSessionCount, 1000);
    }
    else {
      interval = setInterval(updateBreakCount, 1000);
    }
    return ()=> clearInterval(interval);
  }, [isPaused, sessionCount, breakCount, dispatch])

  const timeDisplay = (seconds) => {
    return (`${((seconds/60)|0)>9?((seconds/60)|0):"0"+((seconds/60)|0)}:${((seconds%60)|0)>9?((seconds%60)|0):"0"+((seconds%60)|0)}`) 
  }
  
  const reset = () => {
    dispatch({
      type: 'RESET',
      defaultBreakLength: 5,
      defaultSessionLength:25,
      defaultSessionCount: 25*60,
      defaultBreakCount: 5*60
    })
    setIsPaused((prevIsPaused)=> !prevIsPaused);
  }


  return (
    <div className="App">
      <div id="setting">
        <div id="setting-break">
          <p id="break-label">Break Length</p>
          <div>
          <button id="break-increment" onClick={()=>incBreakLength()}><img src={UpIcon} alt="increase break length"/></button>
          <p id="break-length">{breakLength}</p>
          <button id="break-decrement" onClick={()=>decBreakLength()}><img src={DownIcon} alt="decrease break length"/></button>
          </div>
        </div>
        <div id="setting-session">
          <p id="session-label">Session Length</p>
          <div>
            <button id="session-increment" onClick={()=>incSessionLength()}><img src={UpIcon} alt="increase session length"/></button>
            <p id="session-length">{sessionLength}</p>
            <button id="session-decrement" onClick={()=>decSessionLength()}><img src={DownIcon} alt="decrease session length"/></button>
          </div>
        </div>
      </div>
      <div id='counter'>
        <div>
          <img src={TimerIcon} alt='timer icon'/>
          <p id="timer-label">Session/Break</p>
        </div>
        <div>
          <p>Time Left</p>
          <p id="time-left">{sessionCount>=0?timeDisplay(sessionCount): timeDisplay(breakCount)}</p>
        </div>
      </div>
      <div id='control'>
        <button id="start_stop" onClick={()=> setIsPaused((prevIsPaused)=> !prevIsPaused)}><img src={isPaused? StartIcon: PauseIcon} alt="start or pause"/></button>
        <button id="reset" onClick={()=>reset()}><img src={ResetIcon} alt="reset"/></button>
      </div>
    </div>
  );
}

export default App;
