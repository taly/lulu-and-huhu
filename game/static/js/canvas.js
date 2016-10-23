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
var red = "#d86464";

var fontGeorgia = 'Georgia, serif';
var fontTahoma = 'Tahoma, Geneva, sans-serif';
var fontLucida = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';

var buttonsWidth = 200;
var buttonsHeight = 40;	
var titleX = canvasWidth / 2;
var titleY = 100;

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

function getPathString(x1, y1, x2, y2) {
	var s = "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
	return s;
}

function drawLine(x1, y1, x2, y2, attr) {
	var s = getPathString(x1, y1, x2, y2);
	if (attr == null) {
		return canvas.path(s);
	} else {
		return canvas.path(s).attr(attr);
	}
}

function showLevelTitle() {
	var attr = {font: '36px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, titleY, "Level " + level).attr(attr);
}

function showStandardButton(x, y, buttonText, onClick) {
	// Button
	var buttonObj = canvas.rect(x - buttonsWidth / 2, y - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: yellow, stroke: pink});
	buttonObj.id = "standardButton";
	var textObj = canvas.text(canvasWidth / 2, y, buttonText).attr({font: 'Bold 26px ' + fontTahoma, fill: torquiseVeryLight, stroke: "#000"});
	textObj.id = "standardButtonText";

	// Clicker
	var clicker = canvas.rect(x - buttonsWidth / 2, y - buttonsHeight / 2, buttonsWidth, buttonsHeight, 10).attr({fill: "transparent", "stroke-width": 0});
	clicker.id = "standardButtonClicker";
	clicker.click(onClick);

	// Hover
	var hoverIn = function() { textObj.attr({fill: pink}); buttonObj.attr({"stroke-width": 2}); };
	var hoverOut = function() { textObj.attr({fill: torquiseVeryLight}); ; buttonObj.attr({"stroke-width": 1}); };
	clicker.hover(hoverIn, hoverOut);
}

function removeStandardButton() {
	var buttonObj = canvas.getById("standardButton");
	var textObj = canvas.getById("standardButtonText");
	var buttonClicker = canvas.getById("standardButtonClicker");
	if (buttonObj != null) {
		buttonObj.remove();
	}
	if (textObj != null) {
		textObj.remove();
	}
	if (buttonClicker != null) {
		buttonClicker.remove();
	}
}

function isStandardButtonShown() {
	var buttonObj = canvas.getById("standardButton");
	var textObj = canvas.getById("standardButtonText");
	var buttonClicker = canvas.getById("standardButtonClicker");
	return (buttonObj != null && textObj != null && buttonClicker != null);
}

function showAnswerButton(x, y, buttonText, onSuccess) {
	showStandardButton(x, y, buttonText, function() {
		promptPassword(onSuccess);
	});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
