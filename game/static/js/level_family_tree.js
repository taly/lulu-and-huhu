var IMG_DIAMETER = 60;
var SIBLING_DIST = 40;
var MARRIAGE_DIST = 35;

var LEFT_X = 40;
var RIGHT_X = 50;
var TOP_Y = 100;
var MIDDLE_Y = 410;
var BOTTOM_Y = 530;

var personCoords = {};

function init() {
	var tempTitleY = titleY - 50; // Just for this level we need a higher title since the family tree takes a lot of real estate
	var attr = {font: '36px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, tempTitleY, "Level " + LEVEL).attr(attr);
	
	var attr = {font: '20px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, tempTitleY + 40, "Drag the bottom pictures to complete the (partial) family tree!").attr(attr);

	var lineAttr = {"stroke-dasharray": "-.", stroke: "#aaa"};
	// var lineAttr = {};
	drawLine(20, MIDDLE_Y, canvasWidth - 20, MIDDLE_Y, lineAttr);

	drawTree();
	drawFamilyMemberBank();
}

function getRes(name) {
	return "/static/img/" + name + "_circle.png";
}

function drawTree() {
	var genHeight = (MIDDLE_Y - TOP_Y) / 4;
	var q = MARRIAGE_DIST;
	
	// Generation 4
	var d = IMG_DIAMETER;
	var r = d / 2;
	var x = LEFT_X;
	var y = MIDDLE_Y - genHeight/2 - r;
	var gen4Y = y;
	for (var i = 1; i <= 3; i++) {
		canvas.image(getRes("cousin" + i), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords["cousin" + i] = {x: x, y: y};
		x += q + d;
	}
	x += 0.5*q;
	canvas.image(getRes("zoe"), x, y, d, d);
	canvas.circle(x + r, y + r, r);
	personCoords["zoe"] = {x: x, y: y};

	// Generation 3
	var hermansWidth = 3*d + 2*q;
	var gen3Start = LEFT_X + 0.5*hermansWidth - 0.5*q - d;
	x = gen3Start;
	y -= genHeight;
	var gen3Y = y;
	var gen3Left = ["michael", "danit", "guy"];
	for (var i = 0; i < gen3Left.length; i++) {
		canvas.image(getRes(gen3Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen3Left[i]] = {x: x, y: y};
		x += d + q;	
	}
	x += 1.5*q;
	var gen3Right = ["liory", "ant", "taly", "yuval"];
	for (var i = 0; i < gen3Right.length; i++) {
		canvas.image(getRes(gen3Right[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen3Right[i]] = {x: x, y: y};
		x += d + q;		
	}

	// Generation 2
	y -= genHeight;
	x = gen3Start + d + q;
	var gen2Y = y;
	var gen2Left = ["yula", "toni", "shmuel"];
	for (var i = 0; i < gen2Left.length; i++) {
		canvas.image(getRes(gen2Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen2Left[i]] = {x: x, y: y};
		x += d + q;
	}
	x += 2*q;
	var gen2RightStart = x;
	var gen2Right = ["natasha", "dadi"];
	for (var i = 0; i < gen2Right.length; i++) {
		canvas.image(getRes(gen2Right[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen2Right[i]] = {x: x, y: y};
		x += d + q;
	}

	// Generation 1
	var gen1 = ["babi", "zeidale"];
	y -= genHeight;
	x = gen2RightStart - 0.5*d - 0.5*q;
	var gen1Y = y;
	for (var i = 0; i < gen1.length; i++) {
		canvas.image(getRes(gen1[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen1[i]] = {x: x, y: y};
		x += d + q;
	}

	// Lines - together
	var h2 = genHeight/2;
	drawLine(personCoords["babi"].x + d, gen1Y + h2, personCoords["zeidale"].x, gen1Y + h2, {});
	drawLine(personCoords["yula"].x + d, gen2Y + h2, personCoords["toni"].x, gen2Y + h2, {});
	drawLine(personCoords["natasha"].x + d, gen2Y + h2, personCoords["dadi"].x, gen2Y + h2, {});
	drawLine(personCoords["michael"].x + d, gen3Y + h2, personCoords["danit"].x, gen3Y + h2, {});
	drawLine(personCoords["liory"].x + d, gen3Y + h2, personCoords["ant"].x, gen3Y + h2, {});
	drawLine(personCoords["taly"].x + d, gen3Y + h2, personCoords["yuval"].x, gen3Y + h2, {});

	// Lines - divorced
	var attr = {"stroke-dasharray": "--", stroke: "#bbb"};
	drawLine(personCoords["shmuel"].x + d, gen2Y + h2, personCoords["natasha"].x, gen2Y + h2, attr);
	drawLine(personCoords["guy"].x + d, gen3Y + h2, personCoords["liory"].x, gen3Y + h2, attr);

	// Lines - single kids
	drawLine(personCoords["natasha"].x + r, personCoords["natasha"].y, personCoords["natasha"].x + r, personCoords["natasha"].y - h2);
	drawLine(personCoords["liory"].x + r, personCoords["liory"].y, personCoords["liory"].x + r, personCoords["liory"].y - h2);
	drawLine(personCoords["taly"].x + 0.5*r, personCoords["taly"].y + 5, personCoords["taly"].x + 0.5*r, personCoords["taly"].y - h2);
	drawLine(personCoords["zoe"].x + r, personCoords["zoe"].y, personCoords["zoe"].x + r, personCoords["zoe"].y - h2);
	drawLine(personCoords["cousin2"].x + r, personCoords["cousin2"].y, personCoords["cousin2"].x + r, personCoords["cousin2"].y - h2);

}

function drawFamilyMemberBank() {
	// TODO
}

function onWin() {
	resetCanvas();
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};


	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Next level", function(redirectUrl) {
		window.location = redirectUrl;
	});
}

function onLose() {
	alert("Something's not right :(\nKeep trying!");
	resetGame();
}

$(document).ready(function() {
	init();	
});