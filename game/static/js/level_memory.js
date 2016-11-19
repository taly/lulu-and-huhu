var CARD_SRC = ["yuri", "yuki", "pitzy", "tuli", "pushkin"];
var NONE = -1;

var clickDisabled;
var firstClicked = NONE;
var numShown;

var topCards, bottomCards;

function init() {
	showLevelTitle();

	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, titleY + 50, "Match the pairs!").attr(attr);

	prepareCache();
	prepareVideo();
	randomizePositions();
	resetCards();

	onWin();
}

function prepareVideo() {
	var width = 450;
	var height = 280;
	var infobox = new Infobox(canvas, {x: canvasWidth/2 - width/2, y: canvasHeight/2 - height/2 - 30, width: width, height:height});
	infobox.div.html('<iframe width="' + width + '" height="' + height + '" id="video" src="https://www.youtube.com/embed/oYRWa-CLXEo" style="display:none;"> </iframe>');
}

function resetCards() {
	numShown = 0;
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
	numShown++;

	if (firstClicked == NONE) {
		firstClicked = top ? i : i + CARD_SRC.length;
	} else {
		var currentClickedType = top ? topCards[i] : bottomCards[i];
		var firstClickedType = top ? bottomCards[firstClicked - CARD_SRC.length] : topCards[firstClicked];
		if (currentClickedType == firstClickedType) {
			firstClicked = NONE;
			
			if (numShown == CARD_SRC.length * 2) {
				clickDisabled = true;
				setTimeout(onWin, 800);
			}
		} else {
			clickDisabled = true;
			setTimeout(function() {
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
	for (var i = 0; i < CARD_SRC.length; i++) {
		(new Image()).src = "/static/img/" + CARD_SRC[i] + "_1.png";
		(new Image()).src = "/static/img/" + CARD_SRC[i] + "_2.png";
	}
}

function onWin() {
	resetCanvas();

	// Title
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 70, "You win!").attr(titleAttr);

	// Final frontier video
	$("#video").show();

	canvas.text(titleX, canvasHeight - 130, "Next level password:").attr({font: '20px ' + fontGeorgia, fill: pink});
	canvas.text(titleX, canvasHeight - 100, "kiliv").attr({font: '28px ' + fontGeorgia, fill: pinkDark});

	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Next level", function(redirectUrl) {
		window.location = redirectUrl;
	});
}


$(document).ready(function() {
	init();	
});