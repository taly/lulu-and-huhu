var IMG_DIAMETER = 60;
var NOMINAL_DIST = 35;

var LEFT_X = 40;
var RIGHT_X = 50;
var TOP_Y = 100;
var MIDDLE_Y = 410;
var BOTTOM_Y = 530;

var PEOPLE = [
	"zeidale", "babi", "yula", "toni", "shmuel", "natasha", "dadi", "michael", "danit",
	"guy", "liory", "ant", "taly", "yuval", "cousin1", "cousin2", "cousin3", "zoe"];

var allowedPositions = [
	["zeidale", "babi"], // 0
	["zeidale", "babi"], // 1
	["yula", "toni"],	 // 2
	["yula", "toni"],	 // 3
	["shmuel"],			 // 4
	["natasha"],		 // 5
	["dadi"],			 // 6
	["michael"],		 // 7
	["danit"],			 // 8
	["guy"],			 // 9
	["liory"],			 // 10
	["ant"],			 // 11
	["taly"],			 // 12
	["yuval"],			 // 13
	["cousin1", "cousin2", "cousin3"], // 14
	["cousin1", "cousin2", "cousin3"], // 15
	["cousin1", "cousin2", "cousin3"], // 16
	["zoe"]				 // 17
];

// var personCoords = {};
var treePositions = [];
var filledPositions = [];

function init() {
	for (var i = 0; i < PEOPLE.length; i++) {
		filledPositions[i] = null;
	}

	var tempTitleY = titleY - 50; // Just for this level we need a higher title since the family tree takes a lot of real estate
	var attr = {font: '36px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, tempTitleY, "Level " + LEVEL).attr(attr);
	
	var attr = {font: '20px ' + fontGeorgia, fill: pink};
	canvas.text(canvasWidth / 2, tempTitleY + 40, "Drag the bottom pictures to their positions in the (partial) family tree!").attr(attr);

	var lineAttr = {"stroke-dasharray": "-.", stroke: "#aaa"};
	// var lineAttr = {};
	drawLine(20, MIDDLE_Y, canvasWidth - 20, MIDDLE_Y, lineAttr);

	drawTree();
	drawFamilyMemberBank();
	prepareCache();
}

function prepareCache() {
	(new Image()).src = "/static/img/zoe_showing.png";
	(new Image()).src = "/static/img/speech1.png";
}

function getRes(name) {
	return "/static/img/" + name + "_circle.png";
}

function drawTree() {
	var genHeight = (MIDDLE_Y - TOP_Y) / 4;
	var q = NOMINAL_DIST;
	var d = IMG_DIAMETER;
	var r = d / 2;
	
	// Generation 4
	var x = LEFT_X;
	var y = MIDDLE_Y - genHeight/2 - r;
	var gen4Y = y;
	for (var i = 0; i < 3; i++) { // Left: michael & danit's kids
		// canvas.image(getRes("cousin" + i), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i + 14] = {x: x, y: y};
		x += q + d;
	}
	x += 0.5*q;
	// canvas.image(getRes("zoe"), x, y, d, d);
	canvas.circle(x + r, y + r, r);
	treePositions[17] = {x: x, y: y}; // Right: zoe <3

	// Generation 3
	var hermansWidth = 3*d + 2*q;
	var gen3Start = LEFT_X + 0.5*hermansWidth - 0.5*q - d;
	x = gen3Start;
	y -= genHeight;
	var gen3Y = y;
	for (var i = 0; i < 3; i++) { // Left: michael, danit, guy
		// canvas.image(getRes(gen3Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i + 7] = {x: x, y: y};
		x += d + q;	
	}
	x += 1.5*q;
	for (var i = 0; i < 4; i++) { // Right: liory, ant, taly, yuval
		// canvas.image(getRes(gen3Right[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i + 10] = {x: x, y: y};
		x += d + q;		
	}

	// Generation 2
	y -= genHeight;
	x = gen3Start + d + q;
	var gen2Y = y;
	for (var i = 0; i < 3; i++) { // Left: yula, toni, shmuel
		// canvas.image(getRes(gen2Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i + 2] = {x: x, y: y};
		x += d + q;
	}
	x += 2*q;
	var gen2RightStart = x;
	// var gen2Right = ["natasha", "dadi"];
	for (var i = 0; i < 2; i++) { // Right: natasha, dadi
		// canvas.image(getRes(gen2Right[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i + 5] = {x: x, y: y};
 		x += d + q;
	}

	// Generation 1
	y -= genHeight;
	x = gen2RightStart - 0.5*d - 0.5*q;
	var gen1Y = y;
	for (var i = 0; i < 2; i++) { // babi, zeidale
		// canvas.image(getRes(gen1[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		treePositions[i] = {x: x, y: y};
		x += d + q;
	}

	// Lines - together
	var h2 = genHeight/2;
	drawLine(treePositions[0].x + d, gen1Y + h2, treePositions[1].x, gen1Y + h2, {}); // babi <-> zeidale
	drawLine(treePositions[2].x + d, gen2Y + h2, treePositions[3].x, gen2Y + h2, {}); // yula <-> toni
	drawLine(treePositions[5].x + d, gen2Y + h2, treePositions[6].x, gen2Y + h2, {}); // natasha <-> dadi
	drawLine(treePositions[7].x + d, gen3Y + h2, treePositions[8].x, gen3Y + h2, {}); // michael <-> danit
	drawLine(treePositions[10].x + d, gen3Y + h2, treePositions[11].x, gen3Y + h2, {}); // liory <-> ant
	drawLine(treePositions[12].x + d, gen3Y + h2, treePositions[13].x, gen3Y + h2, {}); // taly <-> yuval

	// Lines - divorced
	var attr = {"stroke-dasharray": "--", stroke: "#bbb"};
	drawLine(treePositions[4].x + d, gen2Y + h2, treePositions[5].x, gen2Y + h2, attr); // shmuel </-> natasha
	drawLine(treePositions[9].x + d, gen3Y + h2, treePositions[10].x, gen3Y + h2, attr); // guys </-> liory

	// Lines - single / middle kids
	drawLine(treePositions[5].x + r, treePositions[5].y, treePositions[5].x + r, treePositions[5].y - h2); // natasha
	drawLine(treePositions[10].x + r, treePositions[10].y, treePositions[10].x + r, treePositions[10].y - h2); // liory
	drawLine(treePositions[12].x + 0.5*r, treePositions[12].y + 5, treePositions[12].x + 0.5*r, treePositions[12].y - h2); // taly
	drawLine(treePositions[17].x + r, treePositions[17].y, treePositions[17].x + r, treePositions[17].y - h2); // zoe
	drawLine(treePositions[15].x + r, treePositions[15].y, treePositions[15].x + r, treePositions[15].y - h2); // cousin2

	// Small line from parents to even-numbered sets of children
	drawLine(treePositions[2].x + d + q/2, gen2Y + h2, treePositions[2].x + d + q/2, TOP_Y + 2*genHeight, {}); // yula

	// Horizontal sibling connector
	drawLine(treePositions[14].x + r, MIDDLE_Y - genHeight, treePositions[16].x + r, MIDDLE_Y - genHeight, {}); // cousin1 -- cousin2
	drawLine(treePositions[8].x + r, MIDDLE_Y - 2*genHeight, treePositions[9].x + r, MIDDLE_Y - 2*genHeight, {}); // danit -- guy

	// Remaining vertical sibling lines
	drawLine(treePositions[14].x + r, MIDDLE_Y - genHeight, treePositions[14].x + r, treePositions[14].y, {}); // cousin1
	drawLine(treePositions[16].x + r, MIDDLE_Y - genHeight, treePositions[16].x + r, treePositions[16].y, {}); // cousin3
	drawLine(treePositions[8].x + r, MIDDLE_Y - 2*genHeight, treePositions[8].x + r, treePositions[8].y, {}); // danit
	drawLine(treePositions[9].x + r, MIDDLE_Y - 2*genHeight, treePositions[9].x + r, treePositions[9].y, {}); // guy
}

function drawFamilyMemberBank() {
	var keys = PEOPLE;
	shuffle(keys);
	
	var d = IMG_DIAMETER;
	var spacing = 17;
	var y = MIDDLE_Y + 5;
	var attr = {cursor: "move"};
	for (var i = 0; i < 9; i++) {
		var x = LEFT_X + i * (d + spacing);
		var pic = canvas.image(getRes(keys[i]), x, y, d, d).attr(attr);
		pic.id = keys[i];
		setDragMethods(pic);
	}
	y += 0.9*d;
	for (var i = 9; i < 18; i++) {
		var x = LEFT_X + d/2 + spacing/2 + (i-9) * (d + spacing);
		var pic = canvas.image(getRes(keys[i]), x, y, d, d).attr(attr);
		pic.id = keys[i];
		setDragMethods(pic);
	}
}

function setDragMethods(pic) {
	var onDragStart = function() {
		this.ox = this.attr("x");
		this.oy = this.attr("y");
		for (var i = 0; i < filledPositions.length; i++) {
			if (filledPositions[i] == this.id) {
				filledPositions[i] = null;
			}
		}
	};
	var onMove = function(dx, dy) {
		this.attr({x: this.ox + dx, y: this.oy + dy});

		var highlight = canvas.getById("highlight");
		if (highlight != null) {
			highlight.remove();	
		}

		var found = false;
		for (var i = 0; i < PEOPLE.length; i++) {
			var cur = treePositions[i];
			var targetRect = {left: cur.x, right: cur.x + IMG_DIAMETER, top: cur.y, bottom: cur.y + IMG_DIAMETER};
			var x = this.attr("x");
			var y = this.attr("y");
			var myRect = {left: x, right: x + IMG_DIAMETER, top: y, bottom: y + IMG_DIAMETER};
			// debugRects(targetRect, myRect);
			if (filledPositions[i] == null && rectIntersect(myRect, targetRect)) {
				var c = canvas.circle(cur.x + IMG_DIAMETER/2, cur.y + IMG_DIAMETER/2, IMG_DIAMETER/2).attr({fill: yellow, opacity: 0.3})
				c.id = "highlight";
				found = true;
				break;
			}
		}
	};
	var onDragEnd = function() {
		for (var i = 0; i < PEOPLE.length; i++) {
			var cur = treePositions[i];
			var targetRect = {left: cur.x, right: cur.x + IMG_DIAMETER, top: cur.y, bottom: cur.y + IMG_DIAMETER};
			var x = this.attr("x");
			var y = this.attr("y");
			var myRect = {left: x, right: x + IMG_DIAMETER, top: y, bottom: y + IMG_DIAMETER};
			if (filledPositions[i] == null && rectIntersect(myRect, targetRect)) {
				this.attr({x: cur.x, y: cur.y});
				var highlight = canvas.getById("highlight");
				if (highlight != null) {
					highlight.remove();	
				}
				filledPositions[i] = this.id;
				break;
			}
		}
		var allFilled = true;
		for (var i = 0; i < filledPositions.length; i++) {
			if (filledPositions[i] == null) {
				allFilled = false;
				break;
			}
		}
		if (allFilled && !isStandardButtonShown()) {
			showStandardButton(canvasWidth / 2, MIDDLE_Y + (BOTTOM_Y - MIDDLE_Y)/2, "Check Tree", onCheckTree);
		} else {
			removeStandardButton();
		}
	};
	pic.drag(onMove, onDragStart, onDragEnd);
}

function onCheckTree() {
	for (var i = 0; i < PEOPLE.length; i++) {
		var filled = filledPositions[i];
		var allowed = allowedPositions[i];
		if (allowed.indexOf(filled) == -1) {
			alert("Something's not right! Keep trying ;)");
			return;
		}
	}
	// TODO onWin
}

function debugRects(r1, r2) {
	var prt1 = canvas.getById("rt1");
	if (prt1 != null) {
		prt1.remove();
	}

	var prt2 = canvas.getById("rt2");
	if (prt2 != null) {
		prt2.remove();
	}

	var rt1 = canvas.rect(r1.left, r1.top, r1.right - r1.left, r1.bottom - r1.top, 0).attr({fill: "#00ff00", opacity: 0.5});
	rt1.id = "rt1";
	var rt2 = canvas.rect(r2.left, r2.top, r2.right - r2.left, r2.bottom - r2.top, 0).attr({fill: "#0000ff", opacity: 0.5});
	rt2.id = "rt2";
}

function dist(a, b) {
	return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function rectIntersect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function onWin() {
	resetCanvas();
	var titleAttr = {font: '30px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 50, "Will you look at that!").attr(titleAttr);

	var width = 523;
	var height = 433;
	canvas.image("/static/img/zoe_showing.png", canvasWidth/2 - width/2, canvasHeight/2 - height/2, width, height);

	width = 192;
	height = 192;
	canvas.image("/static/img/speech1.png", 100, 50, width, height);

	canvas.text(195, 125, "Now... who\nis Dubi's wife???").attr({font: "22px " + fontGeorgia, fill: pinkDark});

	// Continue button
	showAnswerButton(canvasWidth / 2, canvasHeight - 50, "Answer", function(redirectUrl) {
		window.location = redirectUrl;
	});
}

function onLose() {
	alert("Something's not right :(<br>Keep trying!");
	resetGame();
}

$(document).ready(function() {
	init();	
});