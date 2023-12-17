// const arr = [128, 128, 100, 128, 118, 128];
let arr = [14, 5, 72, 12, 100, 128, 118, 128, 10, 128, 19, 17, 16, 15, 40, 2];

console.log(arr);

function renderArray(arr, toPutInBody = true) {
  const div = document.createElement("div");
  div.classList.add("array");
  arr.forEach((e) => {
    const element = document.createElement("div");
    element.textContent = e;
    div.appendChild(element);
  });
  if (toPutInBody) {
    document.body.appendChild(div);
  } else {
    return div;
  } 
}

function highlightElement(i, i2, color = 'green') {
  const index = i;
  const index2 = i2;
  // try {
  //   if (i.isArray()) {

  //   }
  // } catch (e) {}

  function animate(index, arrayDiv) {
    if (typeof i2 === 'string') color = i2;
    const node = Array.from(arrayDiv.childNodes)[index];
    node.animate(
      [
        { border: `2px solid white` },
        { border: `5px solid ${color}` },
        { border: `2px solid white` },
      ],
      { duration: 800, easing: "ease-in-out" }
    )
  }

  setTimeout(() => {
    const arrayDiv = document.querySelector(".array");
    if (typeof index === 'number') {
      animate(index, arrayDiv);
      if (typeof index2 === 'number') {
        for (let i = index + 1; i <= index2; i++)
          animate(i, arrayDiv);
      }
    } else {
      index.forEach(v => animate(v, arrayDiv))
    }
  }, (time));
  time += 1000;
}

// let timeArray = 0;

function compareAndUpdate(oldDiv, newDiv) {
  const childrenOld = Array.from(oldDiv.childNodes);
  const childrenNew = Array.from(newDiv.childNodes);
  const existing = childrenNew.map((childNew) => ({
    childNew,
    childOld: childrenOld.find((child) => {
      if (child.textContent === childNew.textContent && !child.picked) {
        child.picked = true;
        return true;
      }
      return false;
    }),
  }));

  let didAnimate = false;

  existing.forEach(({ childNew: node, childOld: old }) => {
    if (!old) return;
    const oldPos = old.getBoundingClientRect();
    const nodePos = node.getBoundingClientRect();
    const dx = nodePos.left - oldPos.left;
    const dy = nodePos.top - oldPos.top;
    console.log({dx})
    didAnimate = didAnimate || dx != 0;
    if (dx != 0) {
      node.animate(
        [
          {
            translate: `${-dx}px 0rem`,
            offset: 0,
          },
          // {
          //   translate: `${-dx}px ${dx > 0 ? 3 : -3}rem`,
          //   offset: 0.2,
          //   borderColor: "lightgreen",
          //   color: "lightgreen",
          // },
          // {
          //   translate: `0px ${dx > 0 ? 3 : -3}rem`,
          //   offset: 0.8,
          //   borderColor: "lightgreen",
          //   color: "lightgreen",
          // },
          { translate: `0px 0rem` },
        ],
        {
          duration: 800,
          iterations: 1,
          easing: "linear",
          // easing: "ease-in-out",
        }
      );
    }
  });

  console.log("Animating!");
  return didAnimate;
}

function updateArray(arr) {
  const array = arr.slice();
  setTimeout(() => {
    const arrayDivOld = document.querySelector(".array");
    const arrayDivNew = renderArray(array, false);
    document.body.appendChild(arrayDivNew);
    console.log({arrayDivNew, arrayDivOld})
    const didAnimate = compareAndUpdate(arrayDivOld, arrayDivNew);
    // console.log("removing old div")
    arrayDivOld.remove();
    console.log(array);
    // arr.forEach((e) => {
    //   const element = document.createElement("div");
    //   element.textContent = e;
    //   div.appendChild(element);
    // });
    console.log({ didAnimate });
    // if (didAnimate) timeArray += 1000;
  }, (time));
  time += 1000;
}

// function bubble(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - 1; j++) {
//       if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       update(arr);
//     }
//   }
// }

// bubble(arr);

// function shuffle(arr) {
//   console.log("{ i ");
//   for (let i in Array(10).fill(0)) {
//     console.log({ i });
//     const rand1 = Math.floor(Math.random() * arr.length);
//     const rand2 = Math.floor(Math.random() * arr.length);
//     [arr[rand1], arr[rand2]] = [arr[rand2], arr[rand1]];
//   }
//   updateArray(arr);
// }
// renderArray(arr)
// shuffle(arr);

// shuffle(arr);
// shuffle(arr);
// shuffle(arr);
// shuffle(arr);
// shuffle(arr);
// shuffle(arr);


// var items = [5, 3, 7, 6, 2, 9];
// function swap(items, leftIndex, rightIndex) {
//   var temp = items[leftIndex];
//   items[leftIndex] = items[rightIndex];
//   items[rightIndex] = temp;
// }
// function partition(items, left, right) {
//   var pivot = items[Math.floor((right + left) / 2)], //middle element
//     i = left, //left pointer
//     j = right; //right pointer
//   while (i <= j) {
//     while (items[i] < pivot) {
//       i++;
//     }
//     while (items[j] > pivot) {
//       j--;
//     }
//     if (i <= j) {
//       swap(items, i, j); //sawpping two elements
//       i++;
//       j--;
//     }
//   }
//   return i;
// }

// function quickSort(items, left, right) {
//   var index;
//   if (items.length > 1) {
//     index = partition(items, left, right); //index returned from partition
//     if (left < index - 1) {
//       //more elements on the left side of the pivot
//       update(arr);
//       quickSort(items, left, index - 1);
//     }
//     if (index < right) {
//       //more elements on the right side of the pivot
//       update(arr);
//       quickSort(items, index, right);
//     }
//     update(arr);
//   }
//   return items;
// }
// // first call to quick sort
// // quickSort(arr, 0, arr.length - 1);

// console.log({ arr });
