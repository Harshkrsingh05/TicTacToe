let boxes = document.querySelectorAll(".box");
let triangles = document.querySelectorAll(".triang");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO
let count = 0; // To Track Draw
const triangWinPatterns = [
  [0, 1, 2],
  [3,4,5],
  [3, 4, 9],
  [3, 1, 2, 6],
  [0, 1, 4, 8],
  [0, 3, 4, 8],
  [6, 7, 8, 9],
  [0, 3, 6],
  [1, 4, 7, 10],
  [1, 4, 8, 10],
  [2, 5, 9],
  [0, 4, 8],
  [2, 4, 6],
  [8, 9, 10],
  [1, 2, 3, 6],
  [0, 1, 5, 9],
];
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  enableTriangles(); // Added to enable triangles on reset
  msgContainer.classList.add("hide");
  removeWinningStyles();
};

triangles.forEach((triangle) => {
  triangle.addEventListener("click", () => {
    if (turnO) {
      // playerO
      triangle.innerText = "O"; // Changed 'box' to 'triangle'
      turnO = false;
    } else {
      // playerX
      triangle.innerText = "X"; // Changed 'box' to 'triangle'
      turnO = true;
    }
    triangle.disabled = true;
    count++;

    let isWinner = checkWinnerstar();

    if (count === 11 && !isWinner) {
      gameDraw();
    }
  });
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // playerO
      box.innerText = "O";
      turnO = false;
    } else {
      // playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  disableTriangles(); // Added to disable triangles on draw
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const disableTriangles = () => {
  for (let triangle of triangles) {
    triangle.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const enableTriangles = () => {
  for (let triangle of triangles) {
    triangle.disabled = false;
    triangle.innerText = "";
  }
};

const showWinner = (winner, winningCells) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  markWinningCells(winningCells);
  disableBoxes();
};

const markWinningCells = (winningCells) => {
  for (let index of winningCells) {
    if (boxes[index]) {
      boxes[index].classList.add('win');
    }
    if (triangles[index]) {
      triangles[index].classList.add('win');
    }
  }
};


const removeWinningStyles = () => {
  for (let box of boxes) {
    box.classList.remove('win');
  }
  for(let triangle of triangles){
    triangle.classList.remove('win');
  }
};
const checkWinnerstar = () => {
  for (let pattern of triangWinPatterns) {
    let pos1Val = getTriangleInnerText(pattern[0]);
    let pos2Val = getTriangleInnerText(pattern[1]);
    let pos3Val = getTriangleInnerText(pattern[2]);

    // Check if the index is within the bounds of the triangles array
    if (pattern.length === 3 && pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val, pattern);
      return true;
    } else if (pattern.length === 4) {
      let pos4Val = getTriangleInnerText(pattern[3]);

      if (
        pos1Val !== "" &&
        pos1Val === pos2Val &&
        pos2Val === pos3Val &&
        pos3Val === pos4Val
      ) {
        showWinner(pos1Val, pattern);
        return true;
      }
    }
  }
};



const getTriangleInnerText = (index) => {
  if (triangles[index] && triangles[index].innerText) {
    return triangles[index].innerText;
  }
  return "";
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
