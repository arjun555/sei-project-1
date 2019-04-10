console.log('tic tac toe game');

// create an n x n array
function createBoard(n){
    var arr = new Array(n);

    for(var i = 0; i < arr.length; i++){
        arr[i] = new Array(n);
    }
    return arr;
}

function playPiece(piece, x, y){
    gameBoard[y][x] = piece;
}

// returns how many pieces are in the row
function getPieceRowCount(piece, row, n){
    var counter = 0;
    for(var k = 0; k < n; k++){
        if(gameBoard[row][k] == piece)
        {
            counter++;
        }
    }
    return counter;
}

// returns how many pieces are in the column
function getPieceColCount(piece, col, n){
    var counter = 0;
    for(var k = 0; k < n; k++){
        if(gameBoard[k][col] == piece)
        {
            counter++;
        }
    }
    return counter;
}

// returns how many pieces are diagonal
function getPieceDiagonalForwardCount(piece, n){
    var counter = 0;
    for(var k = 0; k < n; k++){
        if(gameBoard[k][k] == piece)
        {
            counter++;
        }
    }
    return counter;
}

// returns how many pieces are diagonal
function getPieceDiagonalBackwardCount(piece, n){
    var counter = 0;
    for(var k = 0; k < n; k++){
        if(gameBoard[k][(n-1)-k] == piece)
        {
            counter++;
        }
    }
    return counter;
}

var gameBoard = [
    ['x', 'o', 'x'],
    ['x', 'x', 'x'],
    ['x', 'x', 'x']
];
