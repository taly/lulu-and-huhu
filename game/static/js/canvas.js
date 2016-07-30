var canvasWidth = 800;
var canvasHeight = 550;
var torquise = "#50f7d3";
var torquiseDark = "#079c7c";
var torquiseVeryLight = "#f5fffd";
var pink = "#F590CB";
var pinkLight = "#fac7e5";
var pinkDark = "#ea1f96";
var yellow = "#FFF04A";
var yellowLight = "#fff9b8";

var fontGeorgia = 'Georgia, serif';
var fontTahoma = 'Tahoma, Geneva, sans-serif';
var fontLucida = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';

var canvas;

$(document).ready(function() {
	canvas = Raphael("gameCanvas", canvasWidth, canvasHeight);
	resetCanvas();
});

function resetCanvas() {
	canvas.clear();

	var strokeWidth = 3;
	var shift1 = 3;
	var shift2 = 9;
	var shift3 = 15;

	canvas.rect(shift1, shift1, canvasWidth - shift1*2, canvasHeight - shift1*2).attr({"stroke": torquise, "stroke-width": strokeWidth});
	canvas.rect(shift2, shift2, canvasWidth - shift2*2, canvasHeight - shift2*2).attr({"stroke": yellow, "stroke-width": strokeWidth});
	canvas.rect(shift3, shift3, canvasWidth - shift3*2, canvasHeight - shift3*2).attr({"stroke": pink, "stroke-width": strokeWidth, fill: "325-"+yellowLight+"-#fff"});
}

function getPathStr(points) {
	var ret = "";
	for (var i = 0; i < points.length; i++) {
		if (i == 0) {
			ret += "M";
		} else {
			ret += "L";
		}
		var point = points[i];
		ret += point.x + "," + point.y;
	}
	ret += "Z";
	return ret;
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

function drawCircle(ctx, x, y, radius, color) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.arc(x, y, radius, 0, 2*Math.PI);
	ctx.stroke();
}

function drawText(ctx, x, y, text, color, font, align) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = align;
	ctx.fillText(text, x, y);
}
