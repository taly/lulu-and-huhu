function init() {
	showLevelTitle();
	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark, "text-anchor": "start"};
	var middleY = canvasHeight / 2;

	var imgWidth = 320;
	var imgHeight = 452;
	canvas.image("/static/img/hamor.png", canvasWidth - imgWidth - 20, middleY - imgHeight / 2, 320, 452);

	var shift = 80;
	var textX = 50;
	canvas.text(textX, middleY - shift, "There once was a very important man named\nChuchkovich.").attr(attr);
	canvas.text(textX, middleY, "Chuchkovich had a very important company.").attr(attr);
	canvas.text(textX, middleY + shift, "What was the original name of that company?").attr(attr);

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);

	// For cache
	(new Image()).src = "/static/img/lulu_zeidale.png";
}

function onSuccess(redirectUrl) {
	resetCanvas();

	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 50, "Excellent!").attr(titleAttr);

	var imgWidth = 297;
	var imgHeight = 396;
	canvas.image("/static/img/lulu_zeidale.png", canvasWidth / 2 - imgWidth / 2, canvasHeight / 2 - imgHeight / 2, imgWidth, imgHeight);

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 50, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});