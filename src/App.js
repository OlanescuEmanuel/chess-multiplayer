import './App.css';
import Board from './components/Board';
import AppContext from './context/Context';

function App() {
  return (

    <AppContext.Provider value={{}} >
      <div className="App">
        <Board/>
      </div>
    </AppContext.Provider>
  )
}


export default App;
