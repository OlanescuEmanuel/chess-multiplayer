import { useReducer, useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import AppContext from './context/Context';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';
import MovesList from './components/Control/MovesList';
import TakeBack from './components/Control/TakeBack';
import Control from './components/Control/Control';

function App() {
  const [appState, dispatch] = useReducer(reducer,initGameState)
  const [gameId, setGameId] = useState(null)  // salvam ID-ul jocului

  useEffect(() => {
    fetch('http://localhost:5000/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      setGameId(data._id)
      console.log('Joc creat cu ID:', data._id)
    })
  }, [])


  const providerState = {
    appState,
    dispatch,
    gameId
  }
  return (
    <AppContext.Provider value={providerState} >
      <div className="App">
        <Board />
        <Control>
          <MovesList/>
          <TakeBack/>
        </Control>
      </div>
    </AppContext.Provider>
  )
}


export default App;
