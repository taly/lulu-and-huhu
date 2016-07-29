var canvasWidth = 700;
var canvasHeight = 450;
var torquise = "#4FF7F5";
var pink = "#F590CB";
var yellow = "#FFF04A";


$(document).ready(function() {
	var canvas = document.getElementById("gameCanvas");
	setupBackground(canvas);
});

function setupBackground(canvas) {
	var ctx = canvas.getContext("2d");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	// Rectangles
	drawRectangle(ctx, 3, "3", torquise);
	drawRectangle(ctx, 9, "3", yellow);
	drawRectangle(ctx, 15, "3", pink);

	// Text
	drawText(ctx, "Hello huhus!", pink);
}

function drawRectangle(ctx, shift, lineWidth, color) {
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = color;

	var startShift = 2;
	var newWidth = canvasWidth - startShift * 2 - shift * 2;
	var newHeight = canvasHeight - startShift * 2 - shift * 2;
	var newX = 2 + (canvasWidth - newWidth) / 2;
	var newY = 2 + (canvasHeight - newHeight) / 2;
	
	ctx.rect(newX, newY, newWidth, newHeight);
	ctx.stroke();
}

function drawText(ctx, text, color) {
	ctx.font = "30px Arial";
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	var x = canvasWidth / 2;
	var y = canvasHeight / 2;
	ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
}
