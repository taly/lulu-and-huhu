var nextLevelUrl;

function init() {
	showLevelTitle(2);
	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, titleY + 50, "How about a game of tic-tac-toe?").attr(attr);
}

function onSuccess(redirectUrl) {
	resetCanvas();

	

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 50, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});