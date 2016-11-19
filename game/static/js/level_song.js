function init() {
	showLevelTitle();
	var attr = {font: '24px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, canvasHeight / 2 - 70, "What song is this?").attr(attr);

	var imgWidth = 700;
	var imgHeight = 60; 
	canvas.image("/static/img/music.png", canvasWidth/2 - imgWidth/2, canvasHeight/2 - imgHeight/2, imgWidth, imgHeight);

	prepareVideo();

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);
}

function prepareVideo() {
var width = 500;
	var height = 320;
	var infobox = new Infobox(canvas, {x: canvasWidth/2 - width/2, y: canvasHeight/2 - height/2 - 30, width: width, height:height});
	infobox.div.html('<iframe width="' + width + '" height="' + height + '" id="video" src="https://www.youtube.com/embed/nr3NNF0QX84" style="display:none;"> </iframe>');
}

function onSuccess(redirectUrl) {
	resetCanvas();

	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 50, "I remember!").attr(titleAttr);

	// Yeled hamor video
	$("#video").show();

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 100, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});