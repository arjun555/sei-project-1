console.log('tic tac toe game');
var gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var playersDatabase ={
    0:{
        Name: 'Player 1' ,
        Piece: 'x',
        Avatar: '',
        CSSClass: 'player1',
        cpu: false,
        wins: 0,
        losses: 0,
        draws: 0
    },
    1:{
        Name: 'Player 2' ,
        Piece: 'o',
        Avatar: '',
        CSSClass: 'player2',
        cpu: false,
        wins: 0,
        losses: 0,
        draws: 0
    }
}
var gameboardDiv = document.querySelector('#gameboard');
var gameboardCells = document.querySelectorAll('.gameboardCell');
var endGameOverlay = document.querySelector('#overlay');
var gameResultSpan = document.querySelector('.game-result');
var gameResultImg = document.querySelector('.game-result-img');
var player1 = playersDatabase[0];
var player2 = playersDatabase[1];
var isPlayer1turn = true;
var isPlayer2turn = false;

// create an n x n array
function createBoard(n){
    var arr = new Array(n);

    for(var i = 0; i < arr.length; i++){
        arr[i] = new Array(n);
    }
    return arr;
}

function playPiece(piece, row, cell){
    gameBoard[row][cell] = piece;
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

function isPlayerWinner(player, boardSize){
    var rowCount, colCount, DiaFwdCount, DiaBckCount;
    // check columns and rows
    for(var i = 0; i < boardSize; i++){
        colCount = getPieceColCount(player.Piece, i, boardSize);
        rowCount = getPieceRowCount(player.Piece, i, boardSize);
        if(rowCount === boardSize || colCount === boardSize){
            return true;
        }
    }
    // check diagonals
    DiaFwdCount = getPieceDiagonalForwardCount(player.Piece, boardSize);
    DiaBckCount = getPieceDiagonalBackwardCount(player.Piece, boardSize);
    if(DiaFwdCount === boardSize || DiaBckCount === boardSize){
        return true;
    }else{
        return false;
    }
}

function updateWinCount(player){
    player.wins += 1;
}

function togglePlayerTurn(){
    if(isPlayer1turn){
        isPlayer1turn = false;
        isPlayer2turn = true;
    }else{
        isPlayer1turn = true;
        isPlayer2turn = false;
    }
}

function isCellPlayed(row, cell){
    if(gameBoard[row][cell] === ""){
        return false;
    }else{
        return true;
    }
}

function isBoardFull(){
    for(var i = 0; i < gameBoard.length; i++){
        for(var j = 0; j < gameBoard.length; j++){
            // console.log(gameBoard[i][j]);
            if(gameBoard[i][j] === ""){
                return false;
            }
        }
    }
    return true;
}  

function clearBoard(){
    for(var i = 0; i < gameBoard.length; i++){
        for(var j = 0; j < gameBoard.length; j++){
            gameBoard[i][j] = "";
        }
    }
}

function clearBoardCSS(){
    gameboardCells.forEach(function(element, index){
        element.classList.remove(player1.CSSClass);
        element.classList.remove(player2.CSSClass);
    });
}

function resetGame(){
    clearBoard();
    clearBoardCSS();
}

function addPieceToGameboard(player, element){
    (element.classList.add(player.CSSClass));
}

function playGame(row, cell){
    if(isPlayer1turn){
        playPiece(player1.Piece, row, cell);
        addPieceToGameboard(player1, event.target);
    }else if(isPlayer2turn){
        playPiece(player2.Piece, row, cell);
        addPieceToGameboard(player2, event.target);
    }
    togglePlayerTurn();

}

function checkWinner(){
    if(isPlayerWinner(player1, gameBoard.length)){
        // player 1 is the winner
        console.log('player 1 won');
        updateWinCount(player1);
        return player1;
    }else if(isPlayerWinner(player2, gameBoard.length)){
        // player 2 is the winner
        console.log('player 2 won');
        updateWinCount(player2);
        return player2;
    }else if(isBoardFull()){
        console.log('draw');
        return 'Draw';
    }else{
        return null;
    }
}

function setOverlayContent(player){
    if(player !== 'Draw'){
        gameResultSpan.textContent = `${player.Name} is victorious`;
    }else{
        gameResultSpan.textContent = `stalemate`;
    }
}

function showOverlay(){
    endGameOverlay.style.display = 'flex';
}

function hideOverlay(){
    endGameOverlay.style.display = 'none';
}

function handleClick(event){
    //debugger
    var row = event.target.dataset.row;
    var cell = event.target.dataset.cell;

    //If there is a winner, click to close winning dialog


    // Play the game
    if(isCellPlayed(row, cell) !== true){
        playGame(row, cell);
    }else{
        console.log('Cell has been played. Choose another cell');
    }

    // Check if there is a winner
    var winner = checkWinner();
    if(winner !== ''){
        setOverlayContent(winner);
        showOverlay();
        console.log(winner);
    }else{
        hideOverlay();
    }
}


function handleOverlayClick(event){
    hideOverlay();
    resetGame();
}

gameboardDiv.addEventListener('click', handleClick);
endGameOverlay.addEventListener('click', handleOverlayClick);