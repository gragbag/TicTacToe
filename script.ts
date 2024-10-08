
function createGameboard() {
	const gameboard: string[] = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
	const playMove = (square: number, player: string) => {
		gameboard[square] = player;
	}

	const findWinner = () => {
		if (checkRows() || checkCols() || checkDiags()) {
			return true;
		}
	}

	const checkRows = (): boolean => {
		for (let i = 0; i < 9; i += 3) {
			if (gameboard[i] == gameboard[i + 1] && gameboard[i] == gameboard[i + 2]) {
				return true;
			}
		}
		return false;
	}

	const checkCols = (): boolean => {
		for (let i = 0; i < 3; i++) {
			if (gameboard[i] == gameboard[i + 3] && gameboard[i] == gameboard[i + 6]) {
				return true;
			}
		}
		return false;
	}

	const checkDiags = (): boolean => {
		if (gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8]) {
			return true;
		}
		if (gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6]) {
			return true;
		}
		return false;
	}

	return {gameboard, playMove, findWinner};
}