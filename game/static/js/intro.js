$(document).ready(function() {
	init();	
});

var controllersY = canvasHeight - 120;
var buttonsWidth = 200;
var buttonsHeight = 40;	
var buttonX = canvasWidth / 2 - buttonsWidth / 2;

var currentIntroPage = -1;

var pages = [
	[
		"Zoe is 10. Lammed is 40.",
		"Wow!!!",
		"Let's celebrate with some games, riddles,\nnostalgia and other surprises..."
	],
	[
		"Each level is a challenge.",
		"When you solve the challenge, good things will happen!",
	],
	[
		"The type and difficulty of the challenges\nwill vary, so stay vigilant!",
		"When a level ends, you'll obtain\nthe password to unlock the next level.",
	],
	[
		"Always remember the last password you've discovered!",
		"The \"Go to Level\" button will ask you for it\nand take you to its corresponding level."
	],
	[
		"Good luck!",
		"The password for level 1 is:\nhappybirthday"
	]
];

function init() {

	// Title
	canvas.text(canvasWidth / 2, canvasHeight / 2 - 50, "Lulu and Huhu's\nBirthday Treasure Hunt!").attr({font: 'Bold 60px "Helvetica Neue", Arial', fill: pink, stroke: torquiseDark, "stroke-width": 1});

	// Go to level button
	showGoToLevelButton();
	
	// Intro button
	var buttonsYDiff = 20;
	var introButton = canvas.rect(buttonX, controllersY - buttonsHeight - buttonsYDiff - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: torquise, stroke: pink});
	var introText = canvas.text(canvasWidth / 2, controllersY - buttonsHeight - buttonsYDiff, "Wait, what?").attr({font: 'Bold 26px "Helvetica Neue", Arial', fill: torquiseVeryLight, stroke: "#000"});
	introButton.click(showIntro);
	introText.click(showIntro);
}

function showGoToLevelButton() {
	var goToLevelButton = canvas.rect(buttonX, controllersY - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: yellow, stroke: pink});
	canvas.text(canvasWidth / 2, controllersY, "Go to Level!").attr({font: 'Bold 26px "Helvetica Neue", Arial', fill: torquiseVeryLight, stroke: "#000"});
	goToLevelButton.click(function() {
		// TODO 
	});
}

function showIntro() {
	showNextIntroPage(true);
}

function showNextIntroPage() {
	showIntroPage(true);
}

function showPreviousIntroPage() {
	showIntroPage(false);
}

function showIntroPage(forward) {

	// These shouldn't happen once we disable the buttons when needed
	if (forward && currentIntroPage == pages.length) {
		return;
	} else if (!forward && currentIntroPage == 0) {
		return;
	}

	resetCanvas();
	showGoToLevelButton();
	drawIntroArrow(true);
	drawIntroArrow(false);

	currentIntroPage = forward ? currentIntroPage + 1 : currentIntroPage - 1;
	if (forward && currentIntroPage == pages.length) {
		// TODO disable forward button
	} else if (!forward && currentIntroPage == 0) {
		// TODO disable back button
	}

	// TODO slide texts with animation

	// Vars	
	texts = pages[currentIntroPage];
	var x = canvasWidth / 2;
	var topY = 50;
	var bottomY = controllersY - buttonsHeight / 2 - 20;
	var gap = (bottomY - topY) / (texts.length + 1);
	var attr = {font: '26px "Helvetica Neue", Arial', fill: torquiseDark};

	// Texts
	for (var i = 0; i < texts.length; i++) {
		var y = topY + (i + 1)*gap;
		canvas.text(x, y, texts[i]).attr(attr);
	}
}

function drawIntroArrow(forward) {
	// Vars
	var arrowShiftX = 200;
	var arrowShiftY = controllersY;
	var x = forward ? canvasWidth - arrowShiftX : arrowShiftX;
	var y = controllersY;
	var outerRadius = 40;
	var innerRadius = 35;
	var triangleWidth = innerRadius;
	var triangleHeight = triangleWidth;

	// Click
	var clickFunc = forward ? showNextIntroPage : showPreviousIntroPage;

	// Circles
	var triX = forward ? x + 5 : x - 5;
	var c1 = canvas.circle(x, y, outerRadius).attr({"stroke": torquise, "stroke-width": 2});
	var c2 = canvas.circle(x, y, innerRadius).attr({"stroke": pink, "stroke-width": 2});
	c1.click(clickFunc);
	c2.click(clickFunc);

	// Triangles
	var x1 = forward ? triX - triangleWidth / 2 : triX + triangleWidth / 2;
	var x2 = x1;
	var x3 = forward ? triX + triangleWidth / 2 : triX - triangleWidth / 2;
	var path = canvas.path(getPathStr([
		{x: x1, y: y - triangleHeight / 2},
		{x: x2, y: y + triangleHeight / 2},
		{x: x3, y: y}
		])).attr({"fill": torquise});
	var hoverIn = function() {path.animate({"fill": torquiseDark}, 10);};
	var hoverOut = function() {path.animate({"fill": torquise}, 10);};
	c1.hover(hoverIn, hoverOut, path, path);
	c2.hover(hoverIn, null, path, path);
	path.hover(hoverIn, null, path, path);
	path.click(clickFunc);
}
