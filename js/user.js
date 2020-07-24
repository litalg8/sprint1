'use strict';
function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (!gGame.isOn) return;
    if (cell.isMarked) return;
    if (gFirstClick) {
        firstClick()
    }
    gFirstClick = false;
    if (!cell.isShown) {
        showCells(i, j)
        if (cell.isMine) {
            // elCell.innerText = MINE;
            // showMines();
            checkGameOver(i, j);
            // resetGame();
        }
    }
}

// marks flag with right click 
function cellFlagged(elCell, i, j) {
    var cell = gBoard[i][j];
    if (!gBoard[i][j].isShown) {
        if (!cell.isMarked) {
            elCell.classList.add('flag')
            cell.isMarked = true;
            elCell.innerText = FLAG;
            gGame.flaggedCount ++
            console.log(cell.isMarked)
        } else {
            elCell.classList.remove('unflag')
            elCell.classList.add('hide')
            cell.isMarked = false;
            elCell.innerText = cell.minesAroundCount;
            elCell.innerText = EMPTY;
        }
    }

}

function firstClick() {
    // clearInterval(gInterval)
    gFirstClick = false; 
    gGame.isOn = true;
    gTime = Date.now();
    gTimeInterval = setInterval(gameTimer, 10);
    var elLogSc = document.querySelector('.time-log')
    elLogSc.style.fontSize = '20px'
    gBoard = buildBoard();
    renderMines(gBoard);
    changeMinesAroundCount(gBoard);

}

function resetGame() {
    gGame.isOn = true;
    gTime = Date.now();
    gFirstClick =true;
    // clearInterval(gInterval = 0)
    // gTimeInterval = setInterval(gameTimer, 10);
    gBoard = buildBoard(gBoard);
    renderMines(gBoard)
    changeMinesAroundCount(gBoard)
    renderBoard();
}

// function resetLevels(){
//     gGame.isOn = true;
//     clearInterval(gInterval)
//     gBoard = buildBoard(gBoard);
//     renderMines(gBoard)
//     changeMinesAroundCount(gBoard)
//     renderBoard();   
// }


function gameTimer() {
    var currTime = Date.now();
    var elLogTime = document.querySelector('.time-log');
    var timePassed = currTime - gTime;
    gGame.secsPassed = (timePassed / 1000).toFixed(0)
    elLogTime.innerText = `${gGame.secsPassed}`
}

function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) showCell({ i, j });
        }
    }
    clearInterval(gTimeInterval)
    var elSmiley = document.querySelector('.restart');
    elSmiley.innerText = DEAD;
}


function showCell(Idx) {
    var cell = gBoard[Idx.i][Idx.j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${Idx.i}-${Idx.j}`)
    elCell.classList.remove('hide')
    elCell.classList.add('show')
    elCell.innerText = cell.isMine ? MINE : (cell.minesAroundCount ? cell.minesAroundCount : '');
}

function showCells(i, j) {
    var cell = gBoard[i][j];
    if (!cell.isShown) {
        showCell({ i, j });
        if (!cell.isMine) gGame.shownCount++;
        if (!cell.minesAroundCount && !cell.isMine) {
            expandShown(i, j);
        }
    }
}

function expandShown(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === row && j === col) continue
            showCells(i, j);
        }
    }
}

function checkGameOver(i, j) {
    var cell = gBoard[i][j];
    if (cell.isShown === true && cell.isMine === true) {
        gGame.isOn = false;
        clearInterval(gTimeInterval) 
        showMines();
        console.log('you lose!');
    } 
     if (cell.isMarked === true && !cell.isShown && !cell.isMine) {
        console.log('you win!')
        showMines();
        clearInterval(gTimeInterval)
        gGame.isOn = false;
    }
}


    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);

// function isWin(){
//     return gShownCount === gLevel.ROWS * gLevel.COLS - gLevel.MINES
// }

// for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard[i].length; j++) {

        //     }
        // }

        // var cell = gBoard[i][j];
        // if (cell.isShown === true && cell.isMine === true) {
        //     alert('you lose!')
        // }



