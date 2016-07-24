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
	drawRectangle(ctx, 1.0, "3", torquise);
	drawRectangle(ctx, 0.97, "3", yellow);
	drawRectangle(ctx, 0.94, "3", pink);

	// Text
	drawText(ctx, "Hello huhus!", pink);
}

function drawRectangle(ctx, perc, lineWidth, color) {
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = color;

	var newWidth = (canvasWidth - 6) * perc;
	var newHeight = (canvasHeight - 6) * perc;
	var newX = 2 + (canvasWidth - newWidth) / 2;
	var newY = 2 + (canvasHeight - newHeight) / 2;
	
	ctx.rect(newX, newY, newWidth, newHeight);
	ctx.stroke();
}

function drawText(ctx, text, color) {
	ctx.font = "30px Arial";
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
}