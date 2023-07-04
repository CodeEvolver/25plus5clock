import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import BreakIcon from './Assets/icons8-break.svg';
import FocusIcon from './Assets/icons8-focus.svg';
import DownIcon from './Assets/icons8-down.svg';
import UpIcon from './Assets/icons8-up.svg';
import StartIcon from './Assets/icons8-play.svg';
import PauseIcon from './Assets/icons8-stop.svg';
import ResetIcon from './Assets/icons8-reset.svg';
import TimerIcon from './Assets/icons8-timer (1).svg';

function App() {
  const dispatch = useDispatch();

  const breakLength = useSelector((state)=> state.breakLength);
  const sessionLength = useSelector((state)=> state.sessionLength);
  const count = useSelector((state)=> state.count);
  const playing = useSelector((state)=> state.playPause);

  const incBreakLength = () => {
    dispatch({type:'INCBREAK'});
  }
  const decBreakLength = () => {
    dispatch({type:'DECBREAK'});
  }
  const incSessionLength = () => {
    dispatch({type:'INCSESSION'});
  }
  const decSessionLength = () => {
    dispatch({type:'DECSESSION'});
  }
  const start = () => {
    dispatch({type:'START'});
  }
  const pause = () => {
    dispatch({type:'PAUSE'});
  }
  /*const counter = () => {
    if(count>0){
      setInterval(()=>start(), 360000);
0    }
  }*/
  const reset = () => {
    dispatch({
      type: 'RESET',
      defaultBreakLength: 5,
      defaultSessionLength:25
    })
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
          <p id="time-left">{count}:00</p>
        </div>
      </div>
      <div id='control'>
        <button id="start_stop" onClick={()=> playing? pause(): start()}><img src={playing? PauseIcon: StartIcon} alt="start or pause"/></button>
        <button id="reset" onClick={()=>reset()}><img src={ResetIcon} alt="reset"/></button>
      </div>
    </div>
  );
}

export default App;
