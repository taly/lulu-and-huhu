function init() {
	showLevelTitle(1);
	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	var middleY = canvasHeight / 2;
	var shift = 30;
	canvas.text(titleX, middleY - shift, "Let's start with an easy one.").attr(attr);
	canvas.text(titleX, middleY + shift, "Harry Potter's wand contains a feather belonging to which type of bird?").attr(attr);

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);
}

function onSuccess(redirectUrl) {
	resetCanvas();

	// Image
	var zoeImg = new Image();
	zoeImg.src = "/static/img/zoe1.jpg";
	// Using hardcoded values since we won't get these until the image is loaded, which might be too late
	var imgWidth = 500;
	var imgHeight = 375;
	var zoeImgX = canvasWidth / 2 - imgWidth / 2;
	var zoeImgY = canvasHeight / 2 - imgHeight / 2;
	canvas.image(zoeImg.src, zoeImgX, zoeImgY, imgWidth, imgHeight);

	// Title
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 50, "1 year-old Zoe says...").attr(titleAttr);

	// Speech bubble
	var speechImg = new Image();
	speechImg.src = "/static/img/speech1.png";
	// Using hardcoded values since we won't get these until the image is loaded, which might be too late
	var speechWidth = 192;
	var speechHeight = 192;
	var speechX = zoeImgX + 100;
	var speechY = zoeImgY + 10;
	canvas.image(speechImg.src, speechX, speechY, speechWidth, speechHeight);

	// Bubble text
	var bubbleAttr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(speechX + speechWidth / 2, speechY + speechHeight / 2 - 20, "That's right! :)").attr(bubbleAttr);

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 50, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});