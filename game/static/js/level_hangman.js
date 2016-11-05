var ANSWER = "her shoes are too big";
var TOP_Y = 200;
var BOTTOM_Y = canvasHeight - 100;
var MAN_MAX_X = 200;
var MAX_HANGMAN_PIECES = 11;

var guessed = [];
var crossedOff = [];
var hangmanPieces = 0;
var letterCoords = [];
var disable = false;

var letterWidth, letterHeight;

function init() {
	resetGame();
}

function resetGame() {
	resetCanvas();
	showLevelTitle();

	guessed = [];
	hangmanPieces = 0;
	letterCoords = [];
	crossedOff = [];
	disable = false;
	
	var attr = {font: '24px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, TOP_Y - 50, "Let's play Hangman!").attr(attr);

	prepareCache();
	showLetterLines();

	showStandardButton(canvasWidth / 2, canvasHeight - 100, "Guess Letter", onGuessLetterClicked);
}

function prepareCache() {
	(new Image()).src = "/static/img/lamed_shoes.jpeg";
	(new Image()).src = "/static/img/zoe_shoes.jpg";
}

function showLetterLines() {
	var bottomY = (BOTTOM_Y - TOP_Y) / 2 + TOP_Y;
	var middleY = (bottomY - TOP_Y) / 2 + TOP_Y;
	var totalWidth = canvasWidth - MAN_MAX_X;
	var totalHeight = bottomY - TOP_Y;

	var maxChars = " are too big ".length;
	var horSpacing = 10;
	var verSpacing = 10;
	letterWidth = (totalWidth - (maxChars - 1) * horSpacing) / maxChars;
	letterHeight = (totalHeight - (verSpacing * 3)) / 2;

	var wordsByLine = [
		["her", "shoes"],
		["are", "too", "big"]];
	var attr = {"stroke-width": 2};
	var letterIndex = 0;
	for (var i = 0; i < wordsByLine.length; i++) {
		var lineWords = wordsByLine[i];
		var y = TOP_Y + verSpacing*i + letterHeight * (i + 1);
		var x = MAN_MAX_X + letterWidth;
		for (var j = 0; j < lineWords.length; j++) {
			var word = lineWords[j];
			for (var k = 0; k < word.length; k++) {
				letterCoords[letterIndex] = {x: x + letterWidth / 2, y: y - letterHeight / 2};
				drawLine(x, y, x + letterWidth, y, attr);
				x += letterWidth + horSpacing;
				letterIndex++;
			}
			x += letterWidth + horSpacing;
		}
	}
}

function onGuessLetterClicked() {
	if (disable) {
		return;
	}

	var letter = prompt("Which letter?");

	letter = letter.trim();
	if (letter.length != 1) {
		alert("1 letter please!");
		return;
	}
	if (!letter.match(/[a-z]/i)) {
		alert("Must be a letter!");
		return;
	}
	if (guessed.indexOf(letter) != -1) {
		alert("Already guessed this one!");
		return;
	}

	onLetterGuessed(letter.toLowerCase());
}

function onLetterGuessed(letter) {
	guessed.push(letter);
	var found = false;
	
	var spacelessAnswer = ANSWER.replace(new RegExp(" ", 'g'), "");
	var attr = {font: '34px ' + fontGeorgia, fill: torquiseDark};
	for (var i = 0; i < spacelessAnswer.length; i++) {
		if (spacelessAnswer[i] == letter) {
			var coords = letterCoords[i];
			canvas.text(coords.x, coords.y, letter).attr(attr);
			found = true;
		}
	}
	if (found) {
		var win = true;
		for (var i = 0; i < spacelessAnswer.length; i++) {
			if (guessed.indexOf(spacelessAnswer[i]) == -1) {
				win = false;
				break;
			}
		}
		if (win) {
			disable = true;
			setTimeout(onWin, 1000);
		}
	}
	else {
		hangmanPieces++;
		drawHangmanPiece(hangmanPieces);
		
		crossedOff.push(letter);
		drawCrossOffLetter(letter);

		if (hangmanPieces == MAX_HANGMAN_PIECES) {
			disable = true;
			setTimeout(onLose, 1000);
		}
	}
}

function drawCrossOffLetter(letter) {
	var x = MAN_MAX_X + letterWidth;
	var y = TOP_Y + (BOTTOM_Y - TOP_Y) / 2 + 30;
	
	var spacing = 10;

	x += (crossedOff.length - 1) * (letterWidth + spacing);	

	var color = "#aaa";
	var textAttr = {font: '30px ' + fontGeorgia, fill: color};
	canvas.text(x, y, letter).attr(textAttr);
	var lineAttr = {stroke: color};
	var w = (letterWidth / 2) * 0.8;
	var h = (letterHeight / 2) * 0.8;
	drawLine(x - w, y - h, x + w, y + h, lineAttr);
}

function drawHangmanPiece(pieceIndex) {
	var minX = 50;
	var minY = TOP_Y - 50;
	var maxX = MAN_MAX_X - 20;
	var maxY = BOTTOM_Y - 50;
	var h = (maxY - minY);

	var attr = {"stroke-width": 2};
	switch(pieceIndex) {
		case 1:
			drawLine(minX, minY, minX, maxY, attr);
			break;
		case 2:
			drawLine(minX, minY, maxX, minY, attr);
			break;
		case 3:
			drawLine(maxX, minY, maxX, minY + h/3, attr);
			break;
		case 4:
			canvas.circle(maxX, minY + h/3 + h/18, h/18).attr(attr);
			break;
		case 5:
			var y = minY + h/3 + h/9;
			drawLine(maxX, y, maxX, y + 2*h/9, attr);
			break;
		case 6:
			var y = minY + h/3 + h/9;
			drawLine(maxX, y, maxX - h/9, y + h/9, attr);
			break;
		case 7:
			var y = minY + h/3 + h/9;
			drawLine(maxX, y, maxX + h/9, y + h/9, attr);
			break;
		case 8:
			var y = minY + 2 * h/3;
			drawLine(maxX, y, maxX - h/9, y + h/6, attr);
			break;
		case 9:
			var y = minY + 2 * h/3;
			drawLine(maxX, y, maxX + h/9, y + h/6, attr);
			break;
		case 10:
			var extra = 20;
			drawLine(minX - extra, maxY, maxX + extra, maxY, attr);
			break;
		case 11:
			var a = 40;
			drawLine(minX + a, minY, minX, minY + a, attr);
			break;
	}
}

function onWin() {
	resetCanvas();
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 80, "They really are!").attr(titleAttr);

	var zWidth = 441;
	var zHeight = 330;
	canvas.image("/static/img/zoe_shoes.jpg", 100, 130, zWidth, zHeight);

	var lWidth = 306;
	var lHeight = 408;
	canvas.image("/static/img/lamed_shoes.jpeg", 450, 105, lWidth, lHeight);

	var smallTextAttr = {font: '20px ' + fontGeorgia, fill: pink, stroke: pinkLight, "text-anchor": "start"};
	canvas.text(320, 200, "Next").attr(smallTextAttr);
	canvas.text(330, 220, "Level").attr(smallTextAttr);
	canvas.text(330, 240, "Password:").attr(smallTextAttr);

	var lartgeTextAttr = {font: 'bold 60px ' + fontGeorgia, fill: "#EED177", stroke: "#fbf3db", "text-anchor": "start"};
	canvas.text(370, 280, "heels!").attr(lartgeTextAttr);


	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Next level", function(redirectUrl) {
		window.location = redirectUrl;
	});
}

function onLose() {
	alert("You lost :(<br>Try again?");
	resetGame();
}

$(document).ready(function() {
	init();	
});