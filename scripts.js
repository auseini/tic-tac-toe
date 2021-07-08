const Player = (icon = "", type = "") => {
	return {icon, type};
};



let winner;

const xIconPath = "url('images/x.png')";
const oIconPath = "url('images/o.png')";


const player1 = Player("x", "Player");
const player2 = Player("o", "Player");

const gameState = (() => {
	// array for board
	let boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
	let currPlayer = player1;

	return {boardArr, currPlayer};
})();
//board module
const boardObj = (() => {
	//create div for board
	const board = document.createElement("div");
	board.setAttribute("class", "board");
	document.getElementById("main").appendChild(board);
	//create divs for each square and set classes
	const box0 = document.createElement("div");
	box0.setAttribute("class", "box");
	box0.setAttribute("id", "box0");
	board.appendChild(box0);
	box0.addEventListener("click", playTurn);

	const box1 = document.createElement("div");
	box1.setAttribute("class", "box");
	box1.setAttribute("id", "box1");
	board.appendChild(box1);
	box1.addEventListener("click", playTurn);

	const box2 = document.createElement("div");
	box2.setAttribute("class", "box");
	box2.setAttribute("id", "box2");
	board.appendChild(box2);
	box2.addEventListener("click", playTurn);

	const box3 = document.createElement("div");
	box3.setAttribute("class", "box");
	box3.setAttribute("id", "box3");
	board.appendChild(box3);
	box3.addEventListener("click", playTurn);

	const box4 = document.createElement("div");
	box4.setAttribute("class", "box");
	box4.setAttribute("id", "box4");
	board.appendChild(box4);
	box4.addEventListener("click", playTurn);

	const box5 = document.createElement("div");
	box5.setAttribute("class", "box");
	box5.setAttribute("id", "box5");
	board.appendChild(box5);
	box5.addEventListener("click", playTurn);

	const box6 = document.createElement("div");
	box6.setAttribute("class", "box");
	box6.setAttribute("id", "box6");
	board.appendChild(box6);
	box6.addEventListener("click", playTurn);

	const box7 = document.createElement("div");
	box7.setAttribute("class", "box");
	box7.setAttribute("id", "box7");
	board.appendChild(box7);
	box7.addEventListener("click", playTurn);

	const box8 = document.createElement("div");
	box8.setAttribute("class", "box");
	box8.setAttribute("id", "box8");
	board.appendChild(box8);
	box8.addEventListener("click", playTurn);

	return { board, box0, box1, box2, box3, box4, box5, box6, box7, box8};

})();

//function to update board
function updateBoard() {
	for (let i = 0; i < gameState.boardArr.length; i++) {
		if(gameState.boardArr[i] === "x"){
			document.getElementById("box" + i).style.backgroundImage = xIconPath;
		} else if( gameState.boardArr[i] === "o") {
			document.getElementById("box" + i).style.backgroundImage = oIconPath;

		} else {
			document.getElementById("box" + i).style.backgroundImage = "";
		}
		
	}
}
async function playTurn(e){
	const id = e.target.id.slice(-1);
	gameState.boardArr[id] = gameState.currPlayer.icon;
	updateBoard();
	
	let gameOver = winCondition([...gameState.boardArr], gameState.currPlayer);
	
	
	if(gameState.currPlayer === player1){
		
		gameState.currPlayer = player2;
		if(player2.type !== "Player" && !gameOver){
			disableDivs();
			computerTurn();
			gameOver = winCondition([...gameState.boardArr], gameState.currPlayer);
			updateBoard();
			gameState.currPlayer = player1
			enableDivs();
		}
	} else {
		gameState.currPlayer = player1;
	}
	if(gameOver){
	
		displayWin(winner);
	}
}

function winCondition(board, player){
	if (
		(board[0] == player.icon && board[1] == player.icon && board[2] == player.icon) ||
		(board[3] == player.icon && board[4] == player.icon && board[5] == player.icon) ||
		(board[6] == player.icon && board[7] == player.icon && board[8] == player.icon) ||
		(board[0] == player.icon && board[3] == player.icon && board[6] == player.icon) ||
		(board[1] == player.icon && board[4] == player.icon && board[7] == player.icon) ||
		(board[2] == player.icon && board[5] == player.icon && board[8] == player.icon) ||
		(board[0] == player.icon && board[4] == player.icon && board[8] == player.icon) ||
		(board[2] == player.icon && board[4] == player.icon && board[6] == player.icon)
		) {
			if(player == player1){
				winner = 10;
			} else{
				winner = -10;
			}
		return true;
		} else if (checkFull()){
			winner = 0;
			return true;
		} else {
		return false;
		}
	
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function restart(){
	gameState.boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
	updateBoard();
	gameState.currPlayer = player1;
	//re-enable event listeners for divs
	enableDivs();
}
async function winScreen(){
	document.getElementById("winScreen").style.display="flex";
	await sleep(5000);
	document.getElementById("winScreen").style.display="none";
	
}

function computerTurn() {

	if (player2.type === "Easy"){
		let index = Math.floor(Math.random() * 9);
		while(gameState.boardArr[index] !== "" && !checkFull()){
			index = Math.floor(Math.random() * 9);
		}

		gameState.boardArr[index] = "o";
	} else if(player2.type === "Impossible"){
		let index = minimax([...gameState.boardArr], player2).index;
		
		gameState.boardArr[index] = "o";
	}
	
}
function checkFull(){
	
	if(gameState.boardArr.filter(s => s!="o" && s!="x").length != 0){
		return false;
	}
	
	disableDivs();
	return true;
}
function disableDivs(){
	//disable event listeners for divs
		boardObj.box0.removeEventListener("click", playTurn);
		boardObj.box1.removeEventListener("click", playTurn);
		boardObj.box2.removeEventListener("click", playTurn);
		boardObj.box3.removeEventListener("click", playTurn);
		boardObj.box4.removeEventListener("click", playTurn);
		boardObj.box5.removeEventListener("click", playTurn);
		boardObj.box6.removeEventListener("click", playTurn);
		boardObj.box7.removeEventListener("click", playTurn);
		boardObj.box8.removeEventListener("click", playTurn);
}
function enableDivs(){
	boardObj.box0.addEventListener("click", playTurn);
	boardObj.box1.addEventListener("click", playTurn);
	boardObj.box2.addEventListener("click", playTurn);
	boardObj.box3.addEventListener("click", playTurn);
	boardObj.box4.addEventListener("click", playTurn);
	boardObj.box5.addEventListener("click", playTurn);
	boardObj.box6.addEventListener("click", playTurn);
	boardObj.box7.addEventListener("click", playTurn);
	boardObj.box8.addEventListener("click", playTurn);
}
function displayWin(score){
	disableDivs();
	if(score === 10){
		document.getElementById("winScreen").textContent = "Player 1 Wins!";
	} else if ( score === -10) {
		document.getElementById("winScreen").textContent = "Player 2 Wins!";

	} else{
		document.getElementById("winScreen").textContent = "Draw!";
	}
	
	winScreen();	
}
function updateOpp(e){
	player2.type = String(e.value);	
	restart();
}
//function to determine best move for impposible ai
function minimax(board = [], maximizingPlayer){
	let openSpots = board.filter(s => s!="o" && s !="x");

	//array to hold different move posibilitys
	let moves = [];

	//check if game is over
	if(winCondition(board, player1)){
		return {score: 10};
	} else if(winCondition(board, player2)){
		return {score: -10};
	}else if (openSpots.length === 0){
		return {score: 0};
	} 
	
	//create copy of board and add move to index, then call minimax again
	for (let i = 0; i < openSpots.length; i++){
		//object of move to hold score and index for move
		let move = {};
	
		move.index = board[openSpots[i]];
		board[openSpots[i]] = maximizingPlayer.icon;
	
		if(maximizingPlayer == player1){
			move.score = minimax(board, player2).score;
		} else {
			move.score = minimax(board, player1).score;
		}

		board[openSpots[i]] = move.index;

		//add the move to moves
		moves.push(move);

	}
	
	//loop through every move, store the optimal score into bestMove, return beast move
	let best = -100;
	let bestMove;

	if(maximizingPlayer == player1){
		//if we are looking for best play for player one, take biggest score, otyherwise smallest
		for(let i = 0; i< moves.length; i++){
			if(moves[i].score > best){
				best = moves[i].score;
				bestMove = i;
			}
		} 
	
	} else {
		best = 100
			for(let i = 0; i< moves.length; i++){
				if(moves[i].score < best){
					best = moves[i].score;
					bestMove = i;
				}
			}

	}
	
	return moves[bestMove];
}