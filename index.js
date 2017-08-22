var ticTacToe = function() {
    let gameContainer = null,
        itemsPerRow = 3,
        xMark = true,

        init = (container) => {
            gameContainer = container;
            drawGameBoard(itemsPerRow);
        }

        drawGameBoard = (itemsNum) => {
            let table = document.createElement('table');
            for (let i = 0; i < itemsNum; i++) { 
                let row = document.createElement('tr');
                for (let j = 0; j < itemsNum; j++) {
                    let cell = document.createElement('td');
                    cell.addEventListener("click", drawMark)
                    row.appendChild(cell);

                }
                table.appendChild(row);
            }
            gameContainer.appendChild(table);
        }

        updateGameBoard = (itemsNum) => {
            gameContainer.innerHTML = "";
            drawGameBoard(itemsNum);
        }

        drawMark = (e) => {
            console.log(e.currentTarget.offsetLeft);
            console.log(e.currentTarget.offsetTop);
            console.log(e);
            if (e.currentTarget.innerHTML === '') {
                if (xMark) {
                    e.currentTarget.innerHTML = 'X';
                    xMark = false;
                } else {
                    e.currentTarget.innerHTML = 'O';
                    xMark = true;
                }
            }
        }

    return {
        init: init,
        updateGameBoard: updateGameBoard
    };
}();
