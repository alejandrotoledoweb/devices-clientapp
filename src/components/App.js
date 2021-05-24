import '../styles/App.css';
import Navbar from './navbar';

function App() {
  return (
    <div className="App container">
      <header className="App-header">
       <h1 className="text-white mt-3 mb-3 pt-3 pb-3">Ninja RMM Front End Task</h1>
       <h3 className="text-white mt-2 mb-2 pt-2 pb-3">Devices Task</h3>
      </header>
      <Navbar />
    </div>
  );
}

export default App;