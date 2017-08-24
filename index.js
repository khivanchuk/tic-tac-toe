var ticTacToe = function() {
    let gameContainer = null,
        itemsPerRow = 3,
        xMark = true,
        boardData = [],
        endGame = false;

    const rowMatch = 1,
          colMatch = 2,
          diagonal1Match = 3,
          diagonal2Match = 4,
          noMatch = 0;

        init = (container) => {
            gameContainer = container;
            newGameBoard(itemsPerRow);
            initBoardData(itemsPerRow);
        }

        newGameBoard = (itemsNum) => {
            endGame = false;
            document.getElementById('gameResult').innerHTML = '';

            let table = document.createElement('table');
            table.setAttribute('id', 'gameBoardTable');

            for (let i = 0; i < itemsNum; i++) { 
                let row = document.createElement('tr');
                for (let j = 0; j < itemsNum; j++) {
                    let cell = document.createElement('td');
                    cell.setAttribute('data-row', i);
                    cell.setAttribute('data-col', j);
                    cell.addEventListener("click", drawMark)
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            gameContainer.appendChild(table);
        }

        updateGameBoardSize = (itemsNum) => {
            itemsPerRow = itemsNum;
            gameContainer.innerHTML = "";
            newGameBoard(itemsNum);
            initBoardData(itemsNum);
        }

        drawMark = (e) => {
            if (e.currentTarget.innerHTML === '' && !endGame) {
                let row = e.currentTarget.getAttribute('data-row'),
                    col = e.currentTarget.getAttribute('data-col'),
                    text = '';

                if (xMark) {
                    text = 'X';
                } else {
                    text = '0';
                }

                e.currentTarget.innerHTML = text;
                setBoardCellValue(row, col, text);
                xMark = !xMark;

                let matchType = isMatch(itemsPerRow, text, row, col),
                    table = document.getElementById('gameBoardTable');

                switch (matchType) {
                    case rowMatch:
                        for (let col = 0; col < itemsPerRow; col++) {
                            let cell = table.rows[row].cells[col];
                            cell.setAttribute('bgcolor', 'red');
                        }
                        break;
                    case colMatch:
                        for (let row = 0; row < itemsPerRow; row++) {
                            let cell = table.rows[row].cells[col];
                            cell.setAttribute('bgcolor', 'red');
                        }
                        break;
                    case diagonal1Match:
                        for (let i = 0; i < itemsPerRow; i++) {
                            let cell = table.rows[i].cells[i];
                            cell.setAttribute('bgcolor', 'red');
                        }
                        break;
                    case diagonal2Match:
                        for (let i = 0; i < itemsPerRow; i++) {
                            let cell = table.rows[i].cells[itemsPerRow - 1 - i];
                            cell.setAttribute('bgcolor', 'red');
                        }
                        break;
                }
                if (matchType !== noMatch) {
                    endGame = true;
                    document.getElementById('gameResult').innerHTML = `End of Game! ${text} won!`;
                }
            }
        }

        initBoardData = (size) => {
            boardData = [];
            for (let i = 0; i < size; i++) {
                let row = [];
                for (let i = 0; i < size; i++) {
                    row.push(null);
                }
                boardData.push(row);
            }
        }

        setBoardCellValue = (row, col, mark) => {
            boardData[row][col] = mark;
        }

        isMatch = (size, mark, row, col) => {
            let rowCount = 0,
                colCount = 0,
                d1Count = 0,
                d2Count = 0;

            for (let i = 0; i < size; i++) {
                if (boardData[row][i] === mark) {
                    rowCount ++;
                }
                if (boardData[i][col] === mark) {
                    colCount ++;
                }
                if (boardData[i][i] === mark) {
                    d1Count ++;
                }
                if (boardData[i][size - 1 - i] === mark) {
                    d2Count ++;
                }
            }
            if (rowCount === size) {
                return rowMatch;
            }
            if (colCount === size) {
                return colMatch;
            }
            if (d1Count === size) {
                return diagonal1Match;
            }
            if (d2Count === size) {
                return diagonal2Match;
            }
            return noMatch;
        }

    return {
        init: init,
        updateGameBoardSize: updateGameBoardSize
    };
}();
