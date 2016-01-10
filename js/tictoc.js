(function () {

var ticTocObj = {
	1: {
		1: "1",
		2: "2",
		3: "3"
	},
	2: {
		1: "4",
		2: "5",
		3: "6"
	},
	3: {
		1: "7",
		2: "8",
		3: "9"
	}
};
var clickCount = 0;
var player = 1; // 1 for Player 1, 2 for Player 2 Default is Player 1
var symbol = "X"; // symbol can be "X" or "O" TODO symbol input from Players
var haveWon = false;

function cellClicked (ev) {
	var target = ev.target;
	var col = ev.target.dataset.column;
	var row = ev.target.dataset.row;
	var label = document.createElement("label");
	var text = document.createTextNode(symbol);
	label.className = "symbol";
	label.dataset.column = col;
	label.dataset.row = row;

	label.appendChild(text);

	if (haveWon) {
		alert("Game Completed.. Refresing...");
		location.reload();
	}

	if (!col) {
		return;
	}
	if (ticTocObj[row] && ticTocObj[row][col] === "X" || ticTocObj[row][col] === "O") {
		alert("cell Occupied");
		return;
	}
	else {
		target.appendChild(label);
		if (!ticTocObj[row]) {
			ticTocObj[row] = {};
		}
		ticTocObj[row][col] = symbol;
		
		symbol = (symbol === "X") ? "O" : "X";
		clickCount++;
	}
	
	checkGame({
		row: row,
		col: col
	});

}

function checkGame (config) {

	var r = config.row,
		c = config.col;
	if (haveWon) {
		return;
	}

	//Check for Column
	if ((ticTocObj[1][c] === ticTocObj[2][c]) &&  (ticTocObj[1][c] === ticTocObj[3][c])) {
		alert("player " + player + "Won");
		haveWon = true;
	}

	//Check for Row
	if ((ticTocObj[r][1] === ticTocObj[r][2]) &&  (ticTocObj[r][1] === ticTocObj[r][3])) {
		alert("player " + player + "Won");
		haveWon = true;
	}

	//Check for Diagonal
	if ((ticTocObj[1][1] === ticTocObj[2][2]) &&  (ticTocObj[1][1] === ticTocObj[3][3])) {
		alert("player " + player + "Won")
		haveWon = true;
	}

	if ((ticTocObj[1][3] === ticTocObj[2][2]) &&  (ticTocObj[1][3] === ticTocObj[3][1])) {
		alert("player " + player + "Won");
		haveWon = true;
	}



	if (!haveWon) {
		player = (player === 1) ? 2 : 1;

		var p = document.getElementsByClassName("play")[0];
		p.textContent = "Player " + player;
	}

	if (clickCount === 9) {
		if (!haveWon) {
			alert("Game Finished... Refresing..");
			location.reload();

		}

	}
}

var container = document.getElementsByClassName("tictoc")[0];

container.addEventListener("click", cellClicked);

}) ();
