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
	canvas.text(canvasWidth / 2, tempTitleY + 40, "Drag the bottom pictures to their positions in the family tree!").attr(attr);

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
		// canvas.image(getRes("cousin" + i), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords["cousin" + i] = {x: x, y: y};
		x += q + d;
	}
	x += 0.5*q;
	// canvas.image(getRes("zoe"), x, y, d, d);
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
		// canvas.image(getRes(gen3Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen3Left[i]] = {x: x, y: y};
		x += d + q;	
	}
	x += 1.5*q;
	var gen3Right = ["liory", "ant", "taly", "yuval"];
	for (var i = 0; i < gen3Right.length; i++) {
		// canvas.image(getRes(gen3Right[i]), x, y, d, d);
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
		// canvas.image(getRes(gen2Left[i]), x, y, d, d);
		canvas.circle(x + r, y + r, r);
		personCoords[gen2Left[i]] = {x: x, y: y};
		x += d + q;
	}
	x += 2*q;
	var gen2RightStart = x;
	var gen2Right = ["natasha", "dadi"];
	for (var i = 0; i < gen2Right.length; i++) {
		// canvas.image(getRes(gen2Right[i]), x, y, d, d);
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
		// canvas.image(getRes(gen1[i]), x, y, d, d);
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

	// Small line from parents to even-numbered sets of children
	drawLine(personCoords["yula"].x + d + q/2, gen2Y + h2, personCoords["yula"].x + d + q/2, TOP_Y + 2*genHeight, {});

	// Horizontal sibling connector
	drawLine(personCoords["cousin1"].x + r, MIDDLE_Y - genHeight, personCoords["cousin3"].x + r, MIDDLE_Y - genHeight, {});
	drawLine(personCoords["danit"].x + r, MIDDLE_Y - 2*genHeight, personCoords["guy"].x + r, MIDDLE_Y - 2*genHeight, {});

	// Remaining vertical sibling lines
	drawLine(personCoords["cousin1"].x + r, MIDDLE_Y - genHeight, personCoords["cousin1"].x + r, personCoords["cousin1"].y, {});
	drawLine(personCoords["cousin3"].x + r, MIDDLE_Y - genHeight, personCoords["cousin3"].x + r, personCoords["cousin3"].y, {});
	drawLine(personCoords["danit"].x + r, MIDDLE_Y - 2*genHeight, personCoords["danit"].x + r, personCoords["danit"].y, {});
	drawLine(personCoords["guy"].x + r, MIDDLE_Y - 2*genHeight, personCoords["guy"].x + r, personCoords["guy"].y, {});
}

function drawFamilyMemberBank() {
	var keys = Object.keys(personCoords);
	shuffle(keys);
	
	var d = IMG_DIAMETER;
	var spacing = 17;
	var y = MIDDLE_Y + 5;
	var attr = {cursor: "move"};
	for (var i = 0; i < 9; i++) {
		var x = LEFT_X + i * (d + spacing);
		var pic = canvas.image(getRes(keys[i]), x, y, d, d).attr(attr);
		setDragMethods(pic);
	}
	y += 0.9*d;
	for (var i = 9; i < 18; i++) {
		var x = LEFT_X + d/2 + spacing/2 + (i-9) * (d + spacing);
		var pic = canvas.image(getRes(keys[i]), x, y, d, d).attr(attr);
		setDragMethods(pic);
	}
}

function setDragMethods(pic) {
	var onDragStart = function() {
		this.ox = this.attr("x");
		this.oy = this.attr("y");
	};
	var onMove = function(dx, dy) {
		this.attr({x: this.ox + dx, y: this.oy + dy});

		var highlight = canvas.getById("highlight");
		if (highlight != null) {
			highlight.remove();	
		}

		var keys = Object.keys(personCoords);
		var found = false;
		for (var i = 0; i < keys.length; i++) {
			var cur = personCoords[keys[i]];
			var targetRect = {left: cur.x, right: cur.x + IMG_DIAMETER, top: cur.y, bottom: cur.y + IMG_DIAMETER};
			var x = this.attr("x");
			var y = this.attr("y");
			var myRect = {left: x, right: x + IMG_DIAMETER, top: y, bottom: y + IMG_DIAMETER};
			// debugRects(targetRect, myRect);
			if (rectIntersect(myRect, targetRect)) {
				var c = canvas.circle(cur.x + IMG_DIAMETER/2, cur.y + IMG_DIAMETER/2, IMG_DIAMETER/2).attr({fill: yellow, opacity: 0.3})
				c.id = "highlight";
				found = true;
				break;
			}
		}
		// if (!found) {
		// 	var highlight = canvas.getById("highlight");
		// 	if (highlight != null) {
		// 		highlight.remove();	
		// 	}
		// }
	};
	var onDragEnd = function() {
		var closest = {x: pic.ox, y: pic.oy};
		var epsilonDist = 20;
		var keys = Object.keys(personCoords);
		for (var i = 0; i < keys.length; i++) {
			var cur = personCoords[keys[i]];
			var targetRect = {left: cur.x, right: cur.x + IMG_DIAMETER, top: cur.y, bottom: cur.y + IMG_DIAMETER};
			var x = this.attr("x");
			var y = this.attr("y");
			var myRect = {left: x, right: x + IMG_DIAMETER, top: y, bottom: y + IMG_DIAMETER};
			if (rectIntersect(myRect, targetRect)) {
				this.attr({x: cur.x, y: cur.y});
				var highlight = canvas.getById("highlight");
				if (highlight != null) {
					highlight.remove();	
				}
				break;
			}
		}
	};
	pic.drag(onMove, onDragStart, onDragEnd);
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