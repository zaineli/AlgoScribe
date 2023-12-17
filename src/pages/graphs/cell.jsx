import React, { useState } from 'react'
import style from "./grid.module.css";
import { clear, start, target, wall } from './definitions';
import { clearAnimations } from './algorithms';


const Cell = ({
    isMouseHeld, selected, 
    startCell, setStartCell,
    targetCell, setTargetCell
  }) => {
  const [isWall, setIsWall] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [isStart, setIsStart] = useState(false);

  function handleClick() {
    clearAnimations();    
    if (selected === wall) {
      setIsTarget(false);
      setIsStart(false);
      setIsWall(true);
    } else if (selected === clear) {
      setIsWall(false);
      setIsTarget(false);
      setIsStart(false);
    } else if (selected === target) {
      setTargetCell();
      setIsWall(false);
      setIsStart(false);
      // setIsTarget(true);
    } else if (selected === start) {
      setStartCell()
      setIsWall(false);
      setIsTarget(false);
      // setIsStart(true);
    }
  }

  const className = `${style.cell} ${isWall?style.wall:""} ${startCell?style.start:""} ${targetCell?style.target:""}`

  return (
    <div onClick={handleClick} onMouseEnter={() => {
      if (isMouseHeld) handleClick()
      }} className={className}></div>
  )
}

export default Cell;