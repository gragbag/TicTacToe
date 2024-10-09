
function createGameboard() {
	const gameboard: string[] = new Array(9).fill('a');
	const playMove = (square: number, move: string): boolean => {
		if (gameboard[square] != 'a') {
			return false;
		}
		gameboard[square] = move;
		return true;
	}

	const findWinner = (player: string): boolean => {
		if (checkRows(player) || checkCols(player) || checkDiags(player)) {
			return true;
		}
	}

	

	const checkRows = (player: string): boolean => {
		for (let i = 0; i < 9; i += 3) {
			if (gameboard[i] == player && gameboard[i + 1] == player && gameboard[i + 2] == player) {
				return true;
			}
		}
		return false;
	}

	const checkCols = (player: string): boolean => {
		for (let i = 0; i < 3; i++) {
			if (gameboard[i] == player && gameboard[i + 3] == player && gameboard[i + 6] == player) {
				return true;
			}
		}
		return false;
	}

	const checkDiags = (player:string): boolean => {
		if (gameboard[0] == player && gameboard[4] == player && gameboard[8] == player) {
			return true;
		}
		if (gameboard[2] == player && gameboard[4] == player && gameboard[6] == player) {
			return true;
		}
		return false;
	}

	const resetBoard = () => {
		gameboard.fill('a');
	}

	return {gameboard, playMove, findWinner, resetBoard};
}


function createDisplayController() {

	const playMove = (index: number, move: string) => {
		const square = document.getElementById(index.toString());
		const newMove = document.createElement("p");
		newMove.className = move;
		newMove.innerText = move;

		square.appendChild(newMove);
		square.classList.remove("empty");
	}

	const resetGame = () => {
		const squares = document.querySelectorAll(".square");
		console.log(squares);
		squares.forEach((square) => {
			square.classList.add("empty");
			if (square.firstChild) {
				square.removeChild(square.firstChild);
			}
		})
	}

	

	return {playMove, resetGame};
}

function gameController() {
	const gameboard = createGameboard();
	const displayController = createDisplayController();
	
	let nextPlayer: string = "X"

	const updateEmptySquares = () => {
		const emptySquares = document.querySelectorAll(".empty");
		emptySquares.forEach((square) => {
			square.addEventListener("click", (e) => {
				const index: number = parseInt((e.target as HTMLDivElement).id);
				playMove(index);
			})
		})
	}

	const playMove = (index: number) => {
		if (gameboard.playMove(index, nextPlayer)) {
			displayController.playMove(index, nextPlayer);
			if (gameboard.findWinner(nextPlayer)) {
				console.log(nextPlayer + " Wins!!!");
			}
			changePlayer();

		}
	}

	const changePlayer = () => {
		if (nextPlayer == "X") {
			nextPlayer = "O";
		} else {
			nextPlayer = "X";
		}
	}

	const reset = () => {
		gameboard.resetBoard();
		displayController.resetGame();
	}

	return {gameboard, displayController, updateEmptySquares, reset};
}

let currentGame = gameController();
currentGame.reset();
currentGame.updateEmptySquares();
