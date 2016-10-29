function init() {
	showLevelTitle();
	var attr = {font: '24px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, canvasHeight / 2 - 70, "What song is this?").attr(attr);

	var imgWidth = 700;
	var imgHeight = 60; 
	canvas.image("/static/img/music.png", canvasWidth/2 - imgWidth/2, canvasHeight/2 - imgHeight/2, imgWidth, imgHeight);

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);
}

function onSuccess(redirectUrl) {
	resetCanvas();

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