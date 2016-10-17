var CARD_SRC = ["yuri", "yuki", "pitzy", "tuli", "pushkin"];
var SHOWN = 1;
var HIDDEN = 0;
var NONE = -1;

var clickDisabled;
var firstClicked = NONE;

var topCards, bottomCards;
var topCardsState, bottomCardsState;

function init() {
	showLevelTitle();

	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, titleY + 50, "Match the pairs!").attr(attr);

	prepareCache();
	randomizePositions();
	resetCards();
}

function resetCards() {
	// Reset states
	topCardsState = [];
	bottomCardsState = [];
	for (var i = 0; i < CARD_SRC.length; i++) {
		topCardsState[i] = HIDDEN;
		bottomCardsState[i] = HIDDEN;
	}

	// Draw cards
	for (var i = 0; i < CARD_SRC.length; i++) {
		drawCard(i, true, true);
		drawCard(i, false, true);
	}

}

function drawCard(i, top, hidden) {
	var cardHeight = 135;
	var cardWidth = 100;
	var horizontalSpacing = 30;
	var verticalSpacing = 30;
	var cornerRadius = 20;

	var n = CARD_SRC.length;
	var totalWidth = n * cardWidth + (n - 1) * horizontalSpacing;
	var totalHeight = 2 * cardHeight + verticalSpacing;
	var centerY = canvasHeight / 2 + 70;

	// Remove previous element
	var removeId = hidden ? "shown" : "hidden";
	removeId += top ? "_top" : "_bottom";
	removeId += "_" + i;
	var toRemove = canvas.getById(removeId);
	if (toRemove != null) {
		toRemove.remove();
	}

	// Draw card
	var x = canvasWidth / 2 - totalWidth / 2 + i * (cardWidth + horizontalSpacing);
	var y = top ? centerY - totalHeight / 2 : centerY + verticalSpacing / 2;
	var card;
	if (hidden) {
		var fillColor = top ? torquise : pink;
		card = canvas.rect(x, y, cardWidth, cardHeight, cornerRadius).attr({fill: fillColor});
		var hoverIn = function() { if (canClickCard(top)) { card.attr({"stroke": yellow, "stroke-width": 3}); } }
		var hoverOut = function() { card.attr({"stroke": "#000", "stroke-width": 1}); }
		card.hover(hoverIn, hoverOut);
		card.click(function() { onCardClicked(i, top); });
	} else {
		var srcSuffix = top ? "_2.png" : "_1.png";
		var index = top ? topCards[i] : bottomCards[i];
		card = canvas.image("/static/img/" + CARD_SRC[index] + srcSuffix, x, y, cardWidth, cardHeight);
	}

	// Set card ID
	var id = hidden ? removeId.replace("shown", "hidden") : removeId.replace("hidden", "shown");
	card.id = id;
}

function canClickCard(top) {
	if (clickDisabled) {
		return false;
	}
	return ((firstClicked == NONE) || (top && firstClicked >= CARD_SRC.length) || (!top && firstClicked < CARD_SRC.length));
}

function onCardClicked(i, top) {
	if (!canClickCard(top)) {
		return;
	}

	drawCard(i, top, false);
	var toUpdate = top ? topCardsState : bottomCardsState;
	toUpdate[i] = SHOWN;

	if (firstClicked == NONE) {
		firstClicked = top ? i : i + CARD_SRC.length;
	} else {
		var currentClickedType = top ? topCards[i] : bottomCards[i];
		var firstClickedType = top ? bottomCards[firstClicked - CARD_SRC.length] : topCards[firstClicked];
		if (currentClickedType == firstClickedType) {
			firstClicked = NONE;
			// TODO check if we won
		} else {
			clickDisabled = true;
			setTimeout(function() {
				// TODO disable everything
				resetCards();
				firstClicked = NONE;
				clickDisabled = false;
			}, 1000);
		}
	}
}

function randomizePositions() {
	topCards = [];
	bottomCards = [];
	for (var i = 0; i < CARD_SRC.length; i++) {
		topCards[i] = i;
		bottomCards[i] = i;
	}
	shuffle(topCards);
	shuffle(bottomCards);
}

function prepareCache() {
	// TODO
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


$(document).ready(function() {
	init();	
});