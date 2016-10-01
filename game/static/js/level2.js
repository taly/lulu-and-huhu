var NONE = -1;
var O = 0;
var X = 1;

var edgeLength = 300;
var x = canvasWidth / 2;
var y = canvasHeight / 2 + 80;

var userPlaying;
var spaces;

function init() {
	resetGame();

	// Let's just cheat so that this is ready in the cache for later ;)
	var img = new Image();
	img.src = "/static/img/zoe2.png";
}

function drawSkeleton() {
	// Skeleton lines
	var attr = {'stroke-width': 3};
	var a = edgeLength / 6;
	drawLine(x - a, y - a*3, x - a, y + a*3, attr);
	drawLine(x + a, y - a*3, x + a, y + a*3, attr);
	drawLine(x - a*3, y - a, x + a*3, y - a, attr);
	drawLine(x - a*3, y + a, x + a*3, y + a, attr);

	// Clickers
	addClicker(0, x - a*3, y - a*3);
	addClicker(1, x - a, y - a*3);
	addClicker(2, x + a, y - a*3);
	addClicker(3, x - a*3, y - a);
	addClicker(4, x - a, y - a);
	addClicker(5, x + a, y - a);
	addClicker(6, x - a*3, y + a);
	addClicker(7, x - a, y + a);
	addClicker(8, x + a, y + a);
}

function addClicker(i, x, y) {
	var clicker = canvas.rect(x, y, edgeLength / 3, edgeLength / 3).attr({fill: "transparent", "stroke-width": 0});
	clicker.id = "c" + i;
	clicker.click(function() {
		onClick(i, userPlaying);
	});

	var hoverIn = function() { clicker.attr({"stroke-width": 3, "stroke": "#ccc", "stroke-opacity": 0.5}); };
	var hoverOut = function() { clicker.attr({"stroke-width": 0}); };
	clicker.hover(hoverIn, hoverOut);
}

function onClick(index, player) {
	// Remove clicker
	canvas.getById("c" + index).remove();

	// Prelims
	var a = edgeLength / 6;
	var centerX = x - edgeLength / 2 + a * (1 + 2 * (index % 3));
	var centerY = y - edgeLength / 2 + a * (1 + 2 * (Math.floor(index / 3)));
	var squareLength = a*2*0.7;

	// Draw user move
	if (player == O) {
		canvas.circle(centerX, centerY, squareLength / 2);
	} else {
		var b = squareLength / 2;
		drawLine(centerX - b, centerY - b, centerX + b, centerY + b);
		drawLine(centerX + b, centerY - b, centerX - b, centerY + b);
	}

	// Check if somebody won
	setTimeout(function() {
		spaces[index] = player;
		var computerPlaying = (userPlaying == O) ? X : O;
		var winner = whoWins();
		console.log("WINNER: " + winner);
		if (winner == userPlaying) {
			console.log("onWin");
			onWin();
		} else if (winner == computerPlaying || isBoardFull()) {
			console.log("onLose");
			onLose();
		} else if (player == userPlaying) {
			randomizeMove();
		}
	}, 1000);
}

function isBoardFull() {
	for (var i = 0; i < spaces.length; i++) {
		if (spaces[i] == NONE) {
			return false;
		}
	}
	return true;
}

function resetGame() {
	resetCanvas();

	showLevelTitle(2);
	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, titleY + 50, "How about a game of tic-tac-toe?").attr(attr);
	
	spaces = [
		NONE, NONE, NONE,
		NONE, NONE, NONE,
		NONE, NONE, NONE
	];
	userPlaying = (Math.random() > 0.5) ? O : X;
	console.log("userPlaying " + userPlaying);

	drawSkeleton();

	if (userPlaying == O) {
		randomizeMove();
	}
}

function randomizeMove() {
	var chosenMove = getRandomMove();
	var computerPlaying = (userPlaying == O) ? X : O;
	onClick(chosenMove, computerPlaying);
}

function getRandomMove() {
	// First see if we have a winning move
	var computerPlaying = (userPlaying == O) ? X : O;
	var winningMove = findWinningMove(computerPlaying);
	if (winningMove != -1) {
		return winningMove;
	}

	// Then try to block player from winning
	var losingMove = findWinningMove(userPlaying);
	if (losingMove != -1) {
		return losingMove;
	}

	// Then just randomize move
	var availableSpaces = [];
	for (var i = 0; i < spaces.length; i++) {
		if (spaces[i] == NONE) {
			availableSpaces.push(i);
		}
	}
	var randomIndex = Math.floor(Math.random() * availableSpaces.length);
	return availableSpaces[randomIndex];	
}

function findWinningMove(player) {
	var winningSeqs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (var i = 0; i < winningSeqs.length; i++) {
		var seq = winningSeqs[i];
		if (spaces[seq[0]] == NONE && spaces[seq[1]] == player && spaces[seq[2]] == player) {
			return seq[0];
		} else if (spaces[seq[0]] == player && spaces[seq[1]] == NONE && spaces[seq[2]] == player) {
			return seq[1];
		} else if (spaces[seq[0]] == player && spaces[seq[1]] == player && spaces[seq[2]] == NONE) {
			return seq[2];
		}
	}
	return -1;
}

function whoWins() {
	var winningSeqs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (var i = 0; i < winningSeqs.length; i++) {
		var seq = winningSeqs[i];
		var cur = spaces[seq[0]];
		if (cur != NONE && spaces[seq[1]] == cur && spaces[seq[2]] == cur) {
			console.log("Winning sequence for user " + cur + ": " + seq);
			return cur;
		}
	}
	return NONE;
}

function onWin() {
	resetCanvas();

	// Title
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 70, "You win!").attr(titleAttr);

	// Reveal
	var revealAttr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, 120, "Next level password is:").attr(revealAttr);

	// Password
	var passwordY = 300;
	canvas.text(titleX, passwordY, "beepbeep").attr(revealAttr);

	// Zoe
	var imgWidth = 232;
	var imgHeight = 274;
	var img = canvas.image("/static/img/zoe2.png", titleX - imgWidth / 2, passwordY - imgHeight / 2, imgWidth, imgHeight);
	var anim = Raphael.animation({x: canvasWidth}, 800, "backIn");
	setTimeout(function() {img.animate(anim);}, 1500);

	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Next level", function() {
		window.location = redirectUrl;
	});
}

function onLose() {
	var conf = confirm("No luck :(\nTry again?");
	if (conf) {
		resetGame();
	}
}

$(document).ready(function() {
	init();	
});