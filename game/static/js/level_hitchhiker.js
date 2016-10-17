function init() {
	showLevelTitle();
	showSpace();
	showLevelTitle();
	var attr = {font: '24px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, canvasHeight / 2 - 50, "The Hitchhiker's Guide to the Galaxy").attr(attr);
	canvas.text(canvasWidth / 2, canvasHeight / 2, "Chapter 14").attr(attr);
	canvas.text(canvasWidth / 2, canvasHeight / 2 + 50, "Word number 12").attr(attr);

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);
}

function showSpace() {
	var s = 20;
	var startX = s;
	var startY = s;
	var width = canvasWidth - s*2;
	var height = canvasHeight - s*2;
	canvas.rect(startX, startY, width, height).attr({fill: "#000"});
	for (var i = 0; i < 100; i++) {
		var r = Math.random() * 2 + 1;
		var x = Math.random() * width + startX;
		var y = Math.random() * height + startY;
		canvas.circle(x, y, r).attr({fill: "#fff"});
	}
}

function onSuccess(redirectUrl) {
	resetCanvas();
	showSpace();

	var titleAttr = {font: '30px ' + fontGeorgia, fill: yellow};
	canvas.text(titleX, 50, "The Final Frontier!").attr(titleAttr);

	// TODO payoff

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 100, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});