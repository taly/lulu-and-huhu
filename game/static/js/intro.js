var controllersY = canvasHeight - 120;
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
		"When you solve the challenge, good things will happen!"
	],
	[
		"The type and difficulty of the challenges will vary.",
		"The occasional use of Google and / or pen and paper\nis allowed and encouraged."
	],
	[
		"When a level ends, you'll obtain\nthe password to unlock the next level.",
		"That password will always unlock that same level."
	],
	[
		"You can always leave for a while and come back later,\nusing the \"Go to Level\" button below.",
		"Just always remember the last password\nyou've discovered!"
	],
	[
		"If you're stuck you can always contact Auntie Tafi ;-)",
		"Good luck!",
		"The password for level 1 is:\nhappybirthday"
	]
];

function init() {
	// Custom attribute for title
	canvas.customAttributes.titleGradientAngle = function(angle) {
		return {fill: "" + angle + "-" + pinkLight + "-" + pinkDark};
	};

	// Title
	var titleX = canvasWidth / 2;
	var titleY = canvasHeight / 2 - 50;
	var animShift = 10;
	var title = canvas.text(titleX, titleY, "Lulu and Huhu's\nBirthday Treasure Hunt!")
		.attr({font: 'Bold 58px ' + fontGeorgia, titleGradientAngle: 0, stroke: torquiseDark, "stroke-width": 1});
	
	var anim = Raphael.animation({titleGradientAngle: 360}, 2000).repeat("Infinity");
	// title.animate(anim);

	// Go to level button
	showGoToLevelButton();
	
	// Intro button
	var buttonsYDiff = 20;
	var introButton = canvas.rect(buttonX, controllersY - buttonsHeight - buttonsYDiff - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: torquise, stroke: pink});
	var introButtonText = canvas.text(canvasWidth / 2, controllersY - buttonsHeight - buttonsYDiff, "Wait, what?").attr({font: 'Bold 26px ' + fontTahoma, fill: torquiseVeryLight, stroke: "#000"});

	// Click
	var introButtonClicker = canvas.rect(buttonX, controllersY - buttonsHeight - buttonsYDiff - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: "transparent", "stroke-width": 0});
	introButtonClicker.click(showNextIntroPage);

	// Hover
	var hoverIn = function() { introButtonText.attr({fill: pink}); introButton.attr({"stroke-width": 2}); };
	var hoverOut = function() { introButtonText.attr({fill: torquiseVeryLight}); ; introButton.attr({"stroke-width": 1}); };
	introButtonClicker.hover(hoverIn, hoverOut);
}

function showGoToLevelButton(buttonText) {
	// Button
	var goToLevelButton = canvas.rect(buttonX, controllersY - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: yellow, stroke: pink});
	var gotToLevelText = canvas.text(canvasWidth / 2, controllersY, "Go to Level!").attr({font: 'Bold 26px ' + fontTahoma, fill: torquiseVeryLight, stroke: "#000"});

	// Clicker
	var clicker = canvas.rect(buttonX, controllersY - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: "transparent", "stroke-width": 0});
	clicker.click(function() {
		promptPassword();
	});

	// Hover
	var hoverIn = function() { gotToLevelText.attr({fill: pink}); goToLevelButton.attr({"stroke-width": 2}); };
	var hoverOut = function() { gotToLevelText.attr({fill: torquiseVeryLight}); ; goToLevelButton.attr({"stroke-width": 1}); };
	clicker.hover(hoverIn, hoverOut);
}

function showNextIntroPage() {
	showIntroPage(true);
}

function showPreviousIntroPage() {
	showIntroPage(false);
}

function showIntroPage(forward) {
	currentIntroPage = forward ? currentIntroPage + 1 : currentIntroPage - 1;
	
	resetCanvas();
	showGoToLevelButton();
	drawIntroArrow(true);
	drawIntroArrow(false);

	if (forward && currentIntroPage == 0) {
		var arrowShiftX = 200;
		var arrowShiftY = controllersY;
		var x = canvasWidth - arrowShiftX;
		var y = controllersY - 30;
		showJumpyArrow(x, y, 1);
	}

	// Vars	
	texts = pages[currentIntroPage];
	var x = forward ? 1.5 * canvasWidth : -1.5 * canvasWidth;
	// var x = canvasWidth / 2;
	var topY = 50;
	var bottomY = controllersY - buttonsHeight / 2 - 20;
	var gap = (bottomY - topY) / (texts.length + 1);
	var attr = {font: '26px ' + fontGeorgia, fill: torquiseDark};

	// Texts
	for (var i = 0; i < texts.length; i++) {
		var y = topY + (i + 1)*gap;
		var text = canvas.text(x, y, texts[i]).attr(attr);
		var anim = Raphael.animation({x: canvasWidth / 2}, 800, "elastic").delay(200 * i);
		text.animate(anim);
	}

	// "Jumpy arrow"
	if (currentIntroPage == pages.length - 1) {
		showJumpyArrow(canvasWidth / 2, controllersY - buttonsHeight / 2 - 5, 1);
	}
}

function showJumpyArrow(arrowPointX, arrowPointY, factor) {
	var a = 0.3;
	var b = 0.5;
	var arrowHeight = 50;
	var arrowWidth = 30;

	function getArrowPathStr(curArrowPointY) {
		return getPathStr([
				{x: arrowPointX, y: curArrowPointY},
				{x: arrowPointX + arrowWidth / 2, y: curArrowPointY - a * arrowHeight},
				{x: arrowPointX + b * arrowWidth / 2, y: curArrowPointY - a * arrowHeight},
				{x: arrowPointX + b * arrowWidth / 2, y: curArrowPointY - arrowHeight},
				{x: arrowPointX - b * arrowWidth / 2, y: curArrowPointY - arrowHeight},
				{x: arrowPointX - b * arrowWidth / 2, y: curArrowPointY - a * arrowHeight},
				{x: arrowPointX - arrowWidth / 2, y: curArrowPointY - a * arrowHeight}
		]);
	}

	// Arrow animation
	var duration = 500;
	var arrowShift = 20;
	var path = canvas.path(getArrowPathStr(arrowPointY - arrowShift)).attr({fill: pink});
	var anim = Raphael.animation({path: getArrowPathStr(arrowPointY)}, duration, function() {
		path.animate({path: getArrowPathStr(arrowPointY - arrowShift)}, duration, function() {
			path.animate(anim);
		});
	});
	path.animate(anim);
}

function drawIntroArrow(forward) {
	// Vars
	var arrowShiftX = 200;
	var arrowShiftY = controllersY;
	var x = forward ? canvasWidth - arrowShiftX : arrowShiftX;
	var y = controllersY;
	var outerRadius = 30;
	var innerRadius = 25;
	var triangleWidth = innerRadius*1.1;
	var triangleHeight = triangleWidth;

	var disableButton = (forward && currentIntroPage == pages.length - 1) || (!forward && currentIntroPage == 0);
	// Circles
	var triX = forward ? x + 3 : x - 3;
	var circleFill = disableButton ? "#eee" : "none";
	canvas.circle(x, y, outerRadius).attr({"stroke": torquise, "stroke-width": 2, fill: circleFill});
	canvas.circle(x, y, innerRadius).attr({"stroke": pink, "stroke-width": 2});

	// Triangles
	var x1 = forward ? triX - triangleWidth / 2 : triX + triangleWidth / 2;
	var x2 = x1;
	var x3 = forward ? triX + triangleWidth / 2 : triX - triangleWidth / 2;
	var pathFill = disableButton ? "#ccc" : torquise;
	var pathStroke = disableButton ? "#aaa" : "#222";
	var path = canvas.path(getPathStr([
		{x: x1, y: y - triangleHeight / 2},
		{x: x2, y: y + triangleHeight / 2},
		{x: x3, y: y}
		])).attr({fill: pathFill, stroke: pathStroke});
	if (disableButton) {
		return;
	}

	// Hover
	var clicker = canvas.circle(x, y, outerRadius).attr({fill: "transparent", "stroke-width": 0});
	var hoverIn = function() {path.animate({"fill": torquiseDark}, 10);};
	var hoverOut = function() {path.animate({"fill": torquise}, 10);};
	clicker.hover(hoverIn, hoverOut);

	// Click
	var clickFunc = forward ? showNextIntroPage : showPreviousIntroPage;
	clicker.click(clickFunc);
}

$(document).ready(function() {
	init();	
});
