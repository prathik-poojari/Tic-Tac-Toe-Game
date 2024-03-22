let boxes = document.querySelectorAll(".box");
let scoreBoard = document.querySelector(".score-board")
let resetBtn = document.querySelector(".reset");
let restartBtn = document.querySelector(".restart");
let winner = document.querySelector(".winner");
let clicks = 0;

// console.log(boxes);

let pattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let turnO = true;

const changecolor = () => {    
    for (let box of boxes) {
        box.addEventListener("click", () => { 
            let id1 = box.getAttribute("id");
            let idbox = document.getElementById(`${id1}`);
            if (turnO) {
                idbox.style.color = "red"; 
            } else {
                idbox.style.color = "green";
            }
        })
    }
}

boxes.forEach((box) => {
    changecolor();
    box.addEventListener("click", () => {
        clicks++;
        changecolor();
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkSeq();
        draw();
    })
    
})

const draw = () => {
    // checkSeq();
    if (clicks === 9 && !winner.innerText ) {
        console.log("draw");
        winner.innerText = "It is a draw :-)"
        scoreBoard.classList.remove("hide");
    }
}
const showWinner = (winnerplayer) => {
    disableBox();
    scoreBoard.classList.remove("hide");
    winner.innerText = `Congratulation! ,Winner is ${winnerplayer}`
}

const resetGame = () => {
    enableBox();
    turnO = true;
    scoreBoard.classList.add("hide");
    clicks = 0;
    winner.innerHTML = "";

}
const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const checkSeq = () => {
    for (let ans of pattern) {
        let pos1Val = boxes[ans[0]].innerText
        let pos2Val = boxes[ans[1]].innerText;
        let pos3Val = boxes[ans[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos3Val === pos2Val) {
                showWinner(pos1Val);
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame)

