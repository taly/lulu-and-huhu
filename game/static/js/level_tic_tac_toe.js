var NONE = -1;
var O = 0;
var X = 1;

var edgeLength = 300;
var x = canvasWidth / 2;
var y = canvasHeight / 2 + 80;

var userPlaying;
var spaces;

var boardDisabled;

function init() {
	resetGame();

	// Let's just cheat so that this is ready in the cache for later ;)
	(new Image()).src = "/static/img/zoe2.png";
	(new Image()).src = "/static/img/ribbon1.png";
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
		if (boardDisabled) {
			return;
		}
		onClick(i, userPlaying);
	});

	var hoverIn = function() {
		if (boardDisabled) {
			return;
		}
		clicker.attr({"stroke-width": 3, "stroke": "#ccc", "stroke-opacity": 0.5});
	};
	var hoverOut = function() { clicker.attr({"stroke-width": 0}); };
	clicker.hover(hoverIn, hoverOut);
}

function onClick(index, player) {
	boardDisabled = true;

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
		boardDisabled = false;
	}, 800);
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

	showLevelTitle();
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
	// TTT with 2 perfect players can get a bit boring without this...
	var makeError = Math.random() < 0.4;

	if (!makeError) {
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

	// Ribobon
	var ribbonWidth = 245;
	var ribbonHeight = 94;
	var ribbonX = titleX - imgWidth / 2 - ribbonWidth - 20;
	var ribbonY = passwordY - ribbonHeight / 2;
	var ribbonImg = canvas.image("/static/img/ribbon1.png", ribbonX, ribbonY, ribbonWidth, ribbonHeight);

	// Ribbon string
	var stringBackShift = 30;
	var stringX = ribbonX + ribbonWidth - stringBackShift;
	var stringY = ribbonY + ribbonHeight / 2 + 11;
	var stringLength = 62;
	var ribbonString = drawLine(stringX, stringY, stringX + stringLength, stringY, {"stroke-width": 2});

	// Ribbon text
	var revealAttr = {font: '30px ' + fontGeorgia, fill: red};
	var ribbonText = canvas.text(ribbonX + ribbonWidth / 2, ribbonY + ribbonHeight / 2, "נהג חדש").attr(revealAttr);

	// Animation
	var animDuration = 1000;
	// var anim = Raphael.animation({x: canvasWidth + 50}, animDuration, "backIn");
	setTimeout(function() {
		var canvasOverflowX = 50;

		var ribbonPostAnimX = canvasWidth + canvasOverflowX;
		var ribbonAnim = Raphael.animation({x: ribbonPostAnimX}, animDuration, "backIn");
		ribbonImg.animate(ribbonAnim);

		var ribbonTextAnim = Raphael.animation({x: ribbonPostAnimX + ribbonWidth / 2}, animDuration, "backIn");
		ribbonText.animate(ribbonTextAnim);

		var stringPostAnimX = canvasWidth + canvasOverflowX + ribbonWidth - stringBackShift;
		var stringAnim = Raphael.animation({path: getPathString(stringPostAnimX, stringY, stringPostAnimX + stringLength, stringY)}, animDuration, "backIn");
		ribbonString.animate(stringAnim);

		var imgPostAnimX = 1.5 * canvasWidth - imgWidth / 2 + canvasOverflowX;
		var imgAnim = Raphael.animation({x: imgPostAnimX}, animDuration, "backIn");
		img.animate(imgAnim);

	}, 1500);

	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Next level", function(redirectUrl) {
		window.location = redirectUrl;
	});
}

function onLose() {
	alert("No luck :(<br>Try again?", resetGame);
}

$(document).ready(function() {
	init();	
});