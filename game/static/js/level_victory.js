var MIN_ANIMATION_DURATION = 1000;
var MAX_ANIMATION_DURATION = 3000;
var MAX_DELAY = 1000;

function init() {

	var titleAttr = {font: 'bold 36px ' + fontGeorgia, fill: pinkDark, stroke: "#ccc"};
	canvas.text(titleX, titleY - 30, "Mazal Tov!!!").attr(titleAttr);

	var attr = {font: '22px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, titleY + 10, "What's left to say? Well:").attr(attr);

	prepareVideo();
	randomizeBalloonAnimation();

	var t = Math.floor(MAX_ANIMATION_DURATION + MAX_DELAY) * 0.8;
	setTimeout(function() {
		$("#video").show();
	}, t);
}

function prepareVideo() {
	var width = 600;
	var height = 373;
	var infobox = new Infobox(canvas, {x: canvasWidth/2 - width/2, y: canvasHeight/2 - height/2 + 50, width: width, height:height});
	infobox.div.html('<iframe width="' + width + '" height="' + height + '" id="video" src="https://www.youtube.com/embed/sYw1UOfVJ9w" style="display:none;"> </iframe>');
}

function randomizeBalloonAnimation() {
	var nomHeartWidth = 96;
	var nomHeartHeight = 90;
	var nomBalloonWidth = 88;
	var nomBalloonHeight = 176;
	var minSizePerc = 0.3;
	var numObjects = 50;
	var width, width;
	var res, startY, endY;
	for (var i = 0; i < numObjects; i++) {
		var sizePerc = minSizePerc + Math.random() * (1 - minSizePerc);
		
		var x = Math.random() * canvasWidth;
		var delay = Math.random() * MAX_DELAY;
		var duration = MIN_ANIMATION_DURATION + Math.random() * (MAX_ANIMATION_DURATION - MIN_ANIMATION_DURATION);
		
		if (Math.random() < 0.5) {
			// Heart
			res = "/static/img/heart1.png";
			width = nomHeartWidth * sizePerc;
			height = nomHeartHeight * sizePerc;
			startY = -nomHeartHeight;
			endY = canvasHeight + nomHeartHeight;
		} else {
			// Balloon
			var resNum = Math.floor(Math.random() * 3) + 1;
			res = "/static/img/balloon_" + resNum + ".png";
			width = nomBalloonWidth * sizePerc;
			height = nomBalloonHeight * sizePerc;
			startY = canvasHeight + nomBalloonHeight;
			endY = -nomBalloonHeight;
		}
		
		var anim = Raphael.animation({y: endY}, duration, "easeIn").delay(delay);
		canvas.image(res, x, startY, width, height).animate(anim);
	}
}

$(document).ready(function() {
	init();	
});