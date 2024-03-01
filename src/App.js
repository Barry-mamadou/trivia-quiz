import { useState } from 'react';
import './App.css';
import Home from './Home';
import Quiz from './Quiz';

function App() {
  const [on, setoff] = useState(true)
  const handleClick = ()=>{
    setoff(false)
  }
  return (
    <div>
     {on && <Home switch = {handleClick}/>} 
     {!on && <Quiz />}

    </div>
  );
}

export default App;
