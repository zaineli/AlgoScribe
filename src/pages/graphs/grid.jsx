import React, { useEffect, useMemo, useRef, useState } from 'react'
import style from "./grid.module.css";
import Cell from './cell';
import { start, target } from './definitions';
import { initXUnits, initYUnits } from './algorithms';

const unit = 30;
const timeouts = [];

const Grid = ({isMouseHeld, selected,
    startCell, setStartCell,
    targetCell, setTargetCell,
    setRun
}) => {
    // window.innerWidth / 50; 
    const [xUnits, setXUnits] = useState(0);
    const [yUnits, setYUnits] = useState(0);
    const ref = useRef();


    
    
    function run() {
        if (typeof startCell !== 'number') return;
        const cells = Array.from(document.querySelectorAll(`.${style.cell}`));
    
        timeouts.forEach(timeout => clearTimeout(timeout))
        cells.forEach(cell => {cell.classList.remove(style.visited);
            cell.classList.remove(style.toVisit);
            cell.classList.remove(style.path)});
        
        let time = 0;
        
        const cameFrom = []
        const gScore = cells.map(() => Infinity);
        gScore[startCell] = 0;
        const fScore = cells.map(() => Infinity);
        fScore[startCell] = 0;
    
        const openSet = [startCell];
        const visited = new Set();
    
        while (openSet.length) {
            const current = openSet.reduce((acc, cell) => {
                if (fScore[acc] < fScore[cell]) return acc;
                else return cell; 
            }, openSet[0]);
            openSet.splice(openSet.indexOf(current), 1);
            
            if (visited.has(current)) continue;
            visited.add(current)
            setTimeout(() => {
                cells[current].classList.toggle(style.visited)
            }, time += 33)
    
            if (targetCell === current) {
                let c = current
                while (c !== startCell) {
                    const cCopy = c
                    const timeout = setTimeout(() => {
                        console.log()
                        cells[cCopy].classList.add(style.path);
                    }, time += 20);
                    timeouts.push(timeout);
                    c = cameFrom[c];
                }
                const timeout = setTimeout(() => {
                    cells[startCell].classList.add(style.path);
                    cells.forEach(cell => {
                        if (cell.classList.contains(style.toVisit)) {
                            cell.classList.remove(style.toVisit)
                            cell.classList.add(style.visited)
                        }
                    })
                }, time += 50);
                timeouts.push(timeout);
                return;
            }
    
            for (let n of getNeighbours(current, cells)) {
                const tentativeGScore = gScore[current] + 1;
                if (tentativeGScore < gScore[n]) {
                    cameFrom[n] = current;
                    gScore[n] = tentativeGScore
                    fScore[n] = tentativeGScore + hScore(targetCell, n)
                    if (!openSet.includes(n)) {
                        const timeout = setTimeout(() => {
                            console.log()
                            cells[n].classList.add(style.toVisit);
                        }, time += 16);
                        timeouts.push(timeout);
                        openSet.push(n);
                    }
                }
            }
        }
    }
    
    function hScore(a, b) {
        const x = a % xUnits, y = Math.floor(a / xUnits);
        const x2 = b % xUnits, y2 = Math.floor(b / xUnits);
        return (x - x2) ** 2 + (y - y2) ** 2
    }
    
    function getNeighbours(cell, cells) {
        const result = [];
        const x = cell % xUnits, y = Math.floor(cell / xUnits);
        if (x > 0 && !cells[cell - 1].classList.contains(style.wall)) {
            result.push(cell - 1);
        }
        if (x < xUnits-1 && !cells[cell + 1].classList.contains(style.wall)) {
            result.push(cell + 1);
        }
        if (cell - xUnits >= 0 && !cells[cell - xUnits].classList.contains(style.wall)) {
            result.push(cell -xUnits);
        }
        if (cell + xUnits < cells.length && !cells[cell + xUnits].classList.contains(style.wall)) {
            result.push(cell + xUnits);
        }
        return result;
    }
    
    
    // setRun(run)
    useEffect(() => {setRun(run)}, [startCell, targetCell])

    useEffect(() => {
        if (ref.current) {
            const bounds = ref.current.getBoundingClientRect();
            setXUnits(Math.floor(bounds.width / unit));
            setYUnits(Math.floor(bounds.height / unit));
            initXUnits(Math.floor(bounds.width / unit));
            initYUnits(Math.floor(bounds.height / unit));
            // console.log({count});    
        }
    }, [ref.current])

    console.log({startCell})
    const units = Array(xUnits * yUnits).fill(0).map((_, i) => 
        <Cell selected={selected} isMouseHeld={isMouseHeld} key={i} className={style.cell} 
            targetCell={targetCell === i} startCell={startCell === i}
            setStartCell={() => {setStartCell(i); console.log("Setting start cells!")}} setTargetCell={() => setTargetCell(i)}
        ></Cell>
    )

  return (
    <div ref={ref} className={style.grid}>
    {units}</div>
  )
}



export default Grid;