var g;

function init() {
	showLevelTitle();
	var attr = {font: '20px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, titleY + 50, "Prepare for some Matti Caspi trivia questions!").attr(attr);

	var attr2 = {font: '16px ' + fontGeorgia, fill: pinkDark};
	canvas.text(titleX, canvasHeight - 210, "Build the password for the next level from the first letter of each answer.").attr(attr2);
	
	showQuestionButtons();

	showAnswerButton(canvasWidth / 2, canvasHeight - 100, "Answer", onSuccess);

	// To prepare it in cache
	(new Image()).src = "/static/img/z3l32.png";
}

function showQuestionButtons() {
	var buttonEdge = 80;
	var spacing = 50;
	var n = 5;
	var x = canvasWidth / 2;
	var y = canvasHeight / 2;
	var width = n * buttonEdge + (n - 2) * spacing;
	var cradius = 10;

	// var attr = {fill: "r(0.5, 0.5)#82b6d4:0-#20569a:50-#073776:50-#1291cf:100"};
	var attr = {fill: "90-"+torquise+"-"+torquiseDark, "stroke-width": 1, stroke: torquise};
	for (var i = 0; i < n; i++) {
		var curX = x - width / 2 + i * (buttonEdge + spacing);
		var curY = y - buttonEdge / 2;

		canvas.rect(curX-1, curY-1, buttonEdge+3, buttonEdge+5, cradius).attr({fill: torquiseDark, opacity: 0.7, "stroke-width": 0});
		var button = canvas.rect(curX, curY, buttonEdge, buttonEdge, cradius).attr(attr);
		var text = canvas.text(curX + buttonEdge / 2, curY + buttonEdge / 2, "?").attr({font: "30px " + fontTahoma, fill: "#000"});

		setClicker(button, curX, curY, buttonEdge, cradius, i);
	}
}

function setClicker(button, x, y, buttonEdge, cradius, i) {
	var clicker = canvas.rect(x, y, buttonEdge, buttonEdge, cradius).attr({fill: "transparent", "stroke-width": 0});
	var hoverIn = function() {
		button.attr({"stroke-width": 3, stroke: yellow});	
	};
	var hoverOut = function() {
		button.attr({"stroke-width": 1, stroke: torquise});
	}
	clicker.hover(hoverIn, hoverOut);

	var q;
	clicker.click(function() {
		switch(i) {
			case 0:
				q = "What type of bird does Morris like to keep?";
				break;
			case 1:
				q = "What's the next one after: agitation, occupation, definition, disinfection...?";
				break;
			case 2:
				q = "ֿMatti has vastly collaborated with Sasha ____";
				break;
			case 3:
				q = "Shulamit should return to the ____ we've build together.";
				break;
			case 4:
				q = "How many flies stayed in Dad's nose after he hunted three of them?";
				break;
		}
		alert(q);	
	});

}

function onSuccess(redirectUrl) {
	resetCanvas();
	var attr = {font: '36px ' + fontGeorgia, fill: torquiseDark};
	canvas.text(titleX, 50, "Beautiful!").attr(attr);

	var imgWidth = 381;
	var imgHeight = 405;
	var img = canvas.image("/static/img/z3l32.png", canvasWidth / 2 - imgWidth / 2, canvasHeight / 2 - imgHeight / 2, imgWidth, imgHeight);
	img.transform("s0");
	img.animate({transform: "s1r1800"}, 1000, "easeOut");

	// Continue button
	showStandardButton(canvasWidth / 2, canvasHeight - 50, "Continue", function() {
		window.location = redirectUrl;
	});
}

$(document).ready(function() {
	init();	
});