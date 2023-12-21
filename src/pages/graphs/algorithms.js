import style from "./grid.module.css";

const timeouts = [];

let xUnits = 0;
let yUnits = 0;

export const initXUnits = (x) => xUnits = x; 
export const initYUnits = (x) => yUnits = x; 


export function clearAnimations(cells = Array.from(document.querySelectorAll(`.${style.cell}`))) {
    timeouts.forEach(timeout => clearTimeout(timeout))
    cells.forEach(cell => {cell.classList.remove(style.visited);
        cell.classList.remove(style.toVisit);
        cell.classList.remove(style.path)
    });
}

export function run_bfs(startCell, targetCell) {
    console.log({startCell, targetCell, xUnits, yUnits})
    if (!startCell) return;
    
    const cells = Array.from(document.querySelectorAll(`.${style.cell}`));
    clearAnimations(cells);

    const previous = Array(cells.length).fill(-1);
    const deque = [startCell];
    let time = 50;
    const visited = new Set();
    while (deque.length) {
        const current = deque.shift();
        if (visited.has(current)) continue;
        const timeout = setTimeout(() => {
            cells[current].classList.add(style.visited);
        }, time += 16)
        timeouts.push(timeout)
        visited.add(current);
        if (current === targetCell) {
            let c = current;
            while (previous[c] !== -1) {
                (() => {
                    const copyC = c;
                    const timeout = setTimeout(() => {
                        cells[copyC].classList.add(style.path)
                    }, time += 20)
                    timeouts.push(timeout)
                })()
                c = previous[c];
            }
            const timeout = setTimeout(() => {
                cells[startCell].classList.add(style.path)
                cells.forEach(cell => {
                    if (cell.classList.contains(style.toVisit)) {
                        cell.classList.remove(style.toVisit)
                        cell.classList.add(style.visited)
                    }
                })
            }, time += 16)
            timeouts.push(timeout)
            return;
        }
        for (let n of getNeighbours(current, cells)) {
            if (!visited.has(n)) {
                deque.push(n);
                previous[n] = current;
                const timeout = setTimeout(() => {
                    cells[n].classList.add(style.toVisit)
                }, time += 16)
                timeouts.push(timeout)
            }
        }
    }
}



export function run_dfs(startCell, targetCell) {
    if (!startCell) return;
    const cells = Array.from(document.querySelectorAll(`.${style.cell}`));
    clearAnimations(cells);

    const visited = new Set();
    let time = 100;
    function dfs(i) {
        if (visited.has(i)) return false;
        const timeout = setTimeout(() => {
            cells[i].classList.add(style.visited);
        }, time+=16)
        visited.add(i);
        if (i === targetCell) { 
            setTimeout(() => {
                cells[i].classList.add(style.path);
            }, time+=16);
            return true;
        }
        timeouts.push(timeout);
        const x = i % xUnits, y = Math.floor(i / xUnits);
        let foundPath = false;
        if (x > 0) {
            if (!visited.has(i-1) && !cells[i-1].classList.contains(style.wall)) {
                if (dfs(i-1)) {
                    setTimeout(() => {
                        cells[i].classList.add(style.path);
                    }, time+=16);
                    return true;
                }
            }
        }
        if (x < xUnits-1) {
            if (!visited.has(i+1) && !cells[i+1].classList.contains(style.wall)) {
                if (dfs(i+1)) {
                    setTimeout(() => {
                        cells[i].classList.add(style.path);
                    }, time+=16);
                    return true;
                }
            }
        }
        if (i - xUnits >= 0) {
            if (!visited.has(i-xUnits) && !cells[i-xUnits].classList.contains(style.wall)) {
                if (dfs(i-xUnits)) {
                    setTimeout(() => {
                        cells[i].classList.add(style.path);
                    }, time+=16);
                    return true;
                }
            }
        }
        if (i + xUnits < cells.length) {
            if (!visited.has(i+xUnits) && !cells[i+xUnits].classList.contains(style.wall)) {
                if (dfs(i+xUnits)) {
                    setTimeout(() => {
                        cells[i].classList.add(style.path);
                    }, time+=16);
                    return true;
                }
            }
        }
        // if (foundPath) {

        // }
        return false;
    }

    dfs(startCell)
}


export function run_astar(startCell, targetCell) {
    if (typeof startCell !== 'number') return;

    const cells = Array.from(document.querySelectorAll(`.${style.cell}`));
    clearAnimations(cells);

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
        const timeout = setTimeout(() => {
            cells[current].classList.toggle(style.visited)
        }, time += 33)
        timeouts.push(timeout)
        if (targetCell === current) {
            let c = current
            while (c !== startCell) {
                const cCopy = c
                const timeout = setTimeout(() => {
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
                        cells[n].classList.add(style.toVisit);
                    }, time += 16);
                    timeouts.push(timeout);
                    openSet.push(n);
                }
            }
        }
    }
}


export function run_dijk(startCell, targetCell) {
    if (typeof startCell !== 'number') return;

    const cells = Array.from(document.querySelectorAll(`.${style.cell}`));
    clearAnimations(cells);

    let time = 0;
    
    const cameFrom = []
    const gScore = cells.map(() => Infinity);
    gScore[startCell] = 0;

    const openSet = [startCell];
    const visited = new Set();


    while (openSet.length) {
        const current = openSet.reduce((acc, cell) => {
            if (gScore[acc] < gScore[cell]) return acc;
            else return cell; 
        }, openSet[0]);
        openSet.splice(openSet.indexOf(current), 1);
        
        if (visited.has(current)) continue;
        visited.add(current)
        const timeout = setTimeout(() => {
            cells[current].classList.toggle(style.visited)
        }, time += 33)
        timeouts.push(timeout)

        if (targetCell === current) {
            let c = current
            while (c !== startCell) {
                const cCopy = c
                const timeout = setTimeout(() => {
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
                if (!openSet.includes(n)) {
                    const timeout = setTimeout(() => {
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