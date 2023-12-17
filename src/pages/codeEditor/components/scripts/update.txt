console.log("hello from update!");

function sayHello() {
  console.log("hello from update!");
}

function copy(root) {
  if (!root) return;
  return {
    key: root.key,
    value: root.value,
    left: copy(root.left),
    right: copy(root.right),
  };
}

let old = undefined;

const hash = {};

let time = 1000;

function fixLines(rootDiv) {
  if (!rootDiv) return;
  const current = rootDiv.firstChild.getBoundingClientRect();
  const leftNodeDiv = rootDiv.lastChild.firstChild?.firstChild;
  const rightNodeDiv = rootDiv.lastChild.lastChild?.firstChild;
  if (leftNodeDiv) {
    const next = leftNodeDiv.firstChild.getBoundingClientRect();
    const x = current.x - next.x;
    const y = current.y - next.y;
    const r = Math.sqrt(x ** 2 + y ** 2);
    const angle = Math.atan2(y, x);
    leftNodeDiv.firstChild.style.setProperty("--w", `${r}px`);
    leftNodeDiv.firstChild.style.setProperty("--angle", `${angle}rad`);
  }
  if (rightNodeDiv) {
    const next = rightNodeDiv.firstChild.getBoundingClientRect();
    const x = current.x - next.x;
    const y = current.y - next.y;
    const r = Math.sqrt(x ** 2 + y ** 2);
    const angle = Math.atan2(y, x);
    rightNodeDiv.firstChild.style.setProperty("--w", `${r}px`);
    rightNodeDiv.firstChild.style.setProperty("--angle", `${angle}rad`);
  }

  fixLines(leftNodeDiv);
  fixLines(rightNodeDiv);
}

const linesDiv = document.querySelector(".lines");

function drawLines(rootDiv) {
  if (!rootDiv) return;
  const current = rootDiv.firstChild.getBoundingClientRect();
  const leftNodeDiv = rootDiv.lastChild.firstChild?.firstChild;
  const rightNodeDiv = rootDiv.lastChild.lastChild?.firstChild;
  if (leftNodeDiv) {
    const next = leftNodeDiv.firstChild.getBoundingClientRect();
    const x = next.x; //current.x; // - next.x;
    const y = next.y; //current.y; // - next.y;
    const dx = current.x - x;
    const dy = current.y - y;
    const r = Math.sqrt((x - current.x) ** 2 + (y - current.y) ** 2);
    const angle = Math.atan2(dy, dx);
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line");
    lineDiv.style.setProperty("--x", `${x}px`);
    lineDiv.style.setProperty("--y", `${y}px`);
    lineDiv.style.setProperty("--r", `${r}px`);
    lineDiv.style.setProperty("--angle", `${angle}rad`);
    linesDiv.appendChild(lineDiv);
  }
  if (rightNodeDiv) {
    const next = rightNodeDiv.firstChild.getBoundingClientRect();
    const x = next.x; //current.x; // - next.x;
    const y = next.y; //current.y; // - next.y;
    const dx = current.x - x;
    const dy = current.y - y;
    const r = Math.sqrt((x - current.x) ** 2 + (y - current.y) ** 2);
    const angle = Math.atan2(dy, dx);
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line");
    lineDiv.style.setProperty("--x", `${x}px`);
    lineDiv.style.setProperty("--y", `${y}px`);
    lineDiv.style.setProperty("--r", `${r}px`);
    lineDiv.style.setProperty("--angle", `${angle}rad`);
    linesDiv.appendChild(lineDiv);
  }

  drawLines(leftNodeDiv);
  drawLines(rightNodeDiv);
}

function highlight(value) {
  setTimeout(() => {
    const node = document.querySelector(`.node[data-key="${value}"]`);
    if (!node) return;
    node.firstChild.animate(
      [
        { border: `0.25em solid lightseagreen` },
        { border: `0.25em solid green` },
        { border: `0.25em solid lightseagreen` },
      ],
      { duration: 800, easing: "ease-in-out" }
      // { duration: 500, easing: "ease-in-out" }
    );

  }, time);
  time += 1000;
}

function update(rt) {
  // function update(root) {

  const root = copy(rt);
  setValueAsKey(root);
  setTimeout(() => {
    if (!root) {
      const oldRoot = document.querySelector("#app");
      oldRoot.innerHTML = "";
    }
    console.log("Rendering");
    const treeNewDiv = document.createElement("div");
    const newRoot = render(root, treeNewDiv).querySelector(".node");
    const oldRoot = document.querySelector("#app");
    oldRoot.appendChild(newRoot);
    const animated = animate(newRoot, oldRoot.querySelector(".node"));

    if (animated) {
      linesDiv.innerHTML = "";
      setTimeout(() => {
        // fixLines(newRoot);
        console.log("drawing!");
        // linesDiv.innerHTML = "";
        drawLines(newRoot);
      }, 550);
    }
    oldRoot.firstChild.remove();
  }, time);
  time += 1000;
}

function animate(nodeDiv, oldRoot) {
  // console.log("Checking: ", nodeDiv.firstChild.textContent);
  const key = nodeDiv.getAttribute("data-key");
  // let oldNodeDiv = oldRoot.querySelector(`[data-key="${key}"]`); //use old root instead of doc.
  // if (!oldRoot && oldRoot.getAttribute("data-key")) {
  //   oldNodeDiv = oldRoot;
  // }
  const oldNodeDiv = document.querySelector(`[data-key="${key}"]`); //use old root instead of doc.
  // document causes newly added div to appear in oldNodeDiv
  if (!oldNodeDiv) console.error("Div not found");

  const old = oldNodeDiv.firstChild.getBoundingClientRect();
  const current = nodeDiv.firstChild.getBoundingClientRect();
  const dx = -current.left + old.left;
  const dy = -current.top + old.top;
  let animated = !!(dx || dy);
  nodeDiv.firstChild.animate(
    [
      { transform: `translate(${dx}px, ${dy}px)` },
      { transform: `translate(0, 0)` },
    ],
    { duration: 500, easing: "ease-in-out" }
    // { duration: 500, easing: "ease-in-out" }
  );
  if (document.querySelectorAll(`[data-key="${key}"]`).length <= 1) {
    nodeDiv.firstChild.classList.add("new");
  }

  if (nodeDiv.lastChild?.firstChild?.firstChild) {
    // animated =
    //   animated ||
    const ret = animate(nodeDiv.lastChild.firstChild.firstChild, oldRoot);
    animated = animated || ret;
  }
  if (nodeDiv.lastChild?.lastChild?.firstChild) {
    // animated =
    // animated ||
    const ret = animate(nodeDiv.lastChild.lastChild.firstChild, oldRoot);
    animated = animated || ret;
  }
  return animated;
}

function setValueAsKey(root, set = new Set()) {
  if (!root) return;
  if (set.has(root.value)) {
    console.warn("Duplicate found in tree! Duplicates are not supported.");
  }
  root.key = root.value;
  setValueAsKey(root.left, set);
  setValueAsKey(root.right, set);
}

function render(root, div = document.getElementById("app")) {
  if (!root) return;

  setValueAsKey(root);

  const nodeDiv = document.createElement("div");
  nodeDiv.classList.add("node");
  nodeDiv.setAttribute("data-key", root.key);
  const valueDiv = document.createElement("div");
  valueDiv.classList.add("value");
  valueDiv.textContent = root.value;
  const childrenDiv = document.createElement("div");
  childrenDiv.classList.add("children");
  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left");
  render(root.left, leftDiv);
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right");
  render(root.right, rightDiv);

  div.appendChild(nodeDiv);
  nodeDiv.appendChild(valueDiv);
  nodeDiv.appendChild(childrenDiv);
  childrenDiv.appendChild(leftDiv);
  childrenDiv.appendChild(rightDiv);

  linesDiv.innerHTML = "";
  // console.log({ nodeDiv });
  setTimeout(() => {
    drawLines(nodeDiv);
  }, 500); // Why not working without timeout?
  // fixLines(nodeDiv);

  return div;
}
