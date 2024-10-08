
function createGameboard() {
	const gameboard: string[] = new Array(9).fill('a');
	let nextPlayer = "X";
	const playMove = (square: number): boolean => {
		if (gameboard[square] != 'a') {
			return false;
		}
		gameboard[square] = nextPlayer;
		changePlayer();
		return true;
	}

	const findWinner = (): string => {
		if (checkRows() || checkCols() || checkDiags()) {
			changePlayer();
			return nextPlayer;
		}
	}

	const changePlayer = () => {
		if (nextPlayer == "X") {
			nextPlayer = "O";
		} else {
			nextPlayer = "X";
		}
	}

	const checkRows = (): boolean => {
		for (let i = 0; i < 9; i += 3) {
			if (gameboard[i] == nextPlayer && gameboard[i + 1] == nextPlayer && gameboard[i + 2] == nextPlayer) {
				return true;
			}
		}
		return false;
	}

	const checkCols = (): boolean => {
		for (let i = 0; i < 3; i++) {
			if (gameboard[i] == nextPlayer && gameboard[i + 3] == nextPlayer && gameboard[i + 6] == nextPlayer) {
				return true;
			}
		}
		return false;
	}

	const checkDiags = (): boolean => {
		if (gameboard[0] == nextPlayer && gameboard[4] == nextPlayer && gameboard[8] == nextPlayer) {
			return true;
		}
		if (gameboard[2] == nextPlayer && gameboard[4] == nextPlayer && gameboard[6] == nextPlayer) {
			return true;
		}
		return false;
	}

	return {gameboard, playMove, findWinner};
}

const currentGame = createGameboard();
currentGame.playMove(0);
currentGame.playMove(1);
currentGame.playMove(4);
currentGame.playMove(2);
currentGame.playMove(8);
currentGame.playMove(8);
console.log(currentGame.findWinner());

console.log(currentGame.gameboard);