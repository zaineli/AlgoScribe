import React, { useState } from 'react'

import style from "./controls.module.css";
import { clear, start, target, wall } from './definitions';
import { run_astar, run_bfs, run_dfs, run_dijk } from './algorithms';





const Controls = ({selected, setSelected, run, startCell, targetCell}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [algo, setAlog] = useState("");

  console.log({algo}, algo.length>0)


  return (
    <div className={style.controls}>
        <button onClick={() => setSelected(clear)}>Clear</button>
        <button onClick={() => setSelected(wall)}>Wall</button>
        <button onClick={() => setSelected(target)}>Target</button>
        <button onClick={() => setSelected(start)}>Start</button>
        <button onClick={() => {
          if (algo === "A Star") {
            run_astar(startCell, targetCell);
          } else if (algo === "Depth-First Search") {
            run_dfs(startCell, targetCell);
          } else if (algo === "Breath First Search") {
            run_bfs(startCell, targetCell);
          } else if (algo === "Dijkstra's Algorithm") {
            run_dijk(startCell, targetCell);
          }
        }}>Run</button>
        {/* <button onClick={() => run.fun()}>Run</button> */}

        <div onClick={() => setIsOpen(!isOpen)} className={style.menu}>
          <span>{algo.length ? algo : "Select Algo"}</span>
          <div className={style.options} style={{scale: `${isOpen * 1}`}}>
            <div className={style.option} onClick={() => {
              setAlog("A Star")
              setIsOpen(false);
            }} >
              A Star
            </div>
            <div className={style.option} onClick={() => {
              setAlog("Depth-First Search")
              setIsOpen(false);
            }} >
              Depth-First Search
            </div>
            <div className={style.option} onClick={() => {
              setAlog("Breath First Search")
              setIsOpen(false);
            }} >
              Breath First Search
            </div>
            <div className={style.option} onClick={() => {
              setAlog("Dijkstra's Algorithm")
              setIsOpen(false);
            }} >
              Dijkstra's Algorithm
            </div>
          </div>
        </div>
    </div>
  )
}

export default Controls