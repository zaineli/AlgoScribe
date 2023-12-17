import { useEffect, useState } from 'react'
import './App.css'
import Grid from './grid'
import Controls from './controls';
import { target, wall } from './definitions';


function App() {
  const [isMouseHeld, setIsMouseHeld] = useState(false);
  const [selected, setSelected] = useState(wall);
  const [targetCell, setTargetCell] = useState(null);
  const [startCell, setStartCell] = useState(null);
  const [run, setRun] = useState(() => {});

  useEffect(() => {
    document.body.onmousedown = () => setIsMouseHeld(true);
    document.body.onmouseup = () => setIsMouseHeld(false);
  }, [])

  return (
    <div className="content-graph">
      <Controls targetCell={targetCell} startCell={startCell}
      setSelected={setSelected} selected={selected} run={run}/>
      <Grid isMouseHeld={isMouseHeld} selected={selected}
        targetCell={targetCell} startCell={startCell} run={run} setRun={(fun) => {console.log('setting run', fun);setRun({fun})}}
      setStartCell={setStartCell} setTargetCell={setTargetCell}/>
    </div>
  )
}

export default App;
