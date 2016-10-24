var LEFT_X = 170;
var TOP_Y = 130;
var BOTTOM_Y = 420;

function init() {
	showLevelTitle();
	showRiddle();
	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);
}

function showRiddle() {
	var attr = {font: '40px ' + fontGeorgia};
	var shift = 50;
	var waveW = 60;
	var waveH = 50;
	var wineW = 26;
	var wineH = 60;
	var flipflopW = 43;
	var flipflopH = 53;
	
	var h = (BOTTOM_Y - TOP_Y) / 4;
	var h2 = h/2;
	var y = TOP_Y;

	canvas.image("/static/img/wave.png", LEFT_X, y, waveW, waveH);
	canvas.text(LEFT_X + waveW + shift/2, y + h2, "+").attr(attr);
	canvas.image("/static/img/wave.png", LEFT_X + waveW + shift, y, waveW, waveH);
	canvas.text(LEFT_X + waveW*2 + 1.5*shift, y + h2, "+").attr(attr);
	canvas.image("/static/img/wave.png", LEFT_X + waveW*2 + 2*shift, y, waveW, waveH);
	canvas.text(LEFT_X + waveW*3 + 2.5*shift, y + h2, "=").attr(attr);
	canvas.text(LEFT_X + waveW*3 + 3.5*shift, y + h2, "30").attr(attr);

	y += h;
	var a = 7;
	canvas.image("/static/img/wave.png", LEFT_X, y, waveW, waveH);
	canvas.text(LEFT_X + waveW + shift/2, y + h2, "+").attr(attr);
	canvas.image("/static/img/wine3.png", LEFT_X + waveW + shift - a, y - a, wineW, wineH);
	canvas.image("/static/img/wine3.png", LEFT_X + waveW + shift + a, y + a, wineW, wineH);
	canvas.text(LEFT_X + waveW + wineW + 1.5*shift + a, y + h2, "+").attr(attr);
	canvas.image("/static/img/wine3.png", LEFT_X + waveW + wineW + 2*shift, y - a, wineW, wineH);
	canvas.image("/static/img/wine3.png", LEFT_X + waveW + wineW + 2*shift + 2*a, y + a, wineW, wineH);
	canvas.text(LEFT_X + waveW + wineW + 2*shift + 2*a + wineW + shift/2, y + h2, "=").attr(attr);
	canvas.text(LEFT_X + waveW + wineW + 2*shift + 2*a + wineW + 1.5*shift, y + h2, "18").attr(attr);

	y += h;
	canvas.image("/static/img/wine3.png", LEFT_X, y - a, wineW, wineH);
	canvas.image("/static/img/wine3.png", LEFT_X + 2*a, y + a, wineW, wineH);
	canvas.text(LEFT_X + 2*a + wineW + shift/2, y + h2, "-").attr(attr);
	canvas.image("/static/img/flipflop.png", LEFT_X + 2*a + wineW + shift - a, y + a, flipflopW, flipflopH);
	canvas.image("/static/img/flipflop.png", LEFT_X + 2*a + wineW + shift + a, y - a, flipflopW, flipflopH);
	canvas.text(LEFT_X + 2*a + wineW + shift + a + shift/2 + flipflopW, y + h2, "=").attr(attr);
	canvas.text(LEFT_X + 2*a + wineW + shift + 2*a + shift + flipflopW, y + h2, "2").attr(attr);

	y += h;
	canvas.image("/static/img/flipflop.png", LEFT_X, y+a, flipflopW, flipflopH);
	canvas.text(LEFT_X + flipflopW + shift/2, y + h2, "+").attr(attr);
	canvas.image("/static/img/wave.png", LEFT_X + flipflopW + shift, y, waveW, waveH);
	canvas.text(LEFT_X + flipflopW + waveW + 1.5*shift, y + h2, "x").attr(attr);
	canvas.image("/static/img/wine3.png", LEFT_X + flipflopW + waveW + 2*shift, y + a, wineW, wineH);
	canvas.text(LEFT_X + flipflopW + waveW + wineW + 2.5*shift, y + h2, "=").attr(attr);
	canvas.text(LEFT_X + flipflopW + waveW + wineW + 3.5*shift, y + h2, "?").attr(attr);
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