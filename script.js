const CANVAS = document.querySelector("#composition");
var ctx = CANVAS.getContext("2d");
var compos	= {};
var grid	= {};

function getPal() {
	var url = "http://colormind.io/api/";
	var data = {
		model : "default",
		input : ["N","N","N"]
	}

	var http = new XMLHttpRequest();

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200 && compos.palette == undefined) {
			compos.palette = JSON.parse(http.responseText).result;
		}
	}

	http.open("POST", url, true);
	http.send(JSON.stringify(data));
}
function getDim() {
	// A3 Paper size except in pixels not mm
	compos.width	= 297;
	compos.height	= 420;
}
function doGrid(type) {
	grid.width = compos.width;
	grid.height = compos.height;
	grid.type = type;
	if (type=0) {
		grid.zones = [0, 0, 1, 0.5][0, 0.5, 1, 1]
	}
}

function drawResult() {
	CANVAS.setAttribute("width", compos.width);
	CANVAS.setAttribute("height", compos.height);
	// ctx.fillStyle = compos.palette[0];
	// console.log(compos);
	ctx.fillRect(0,0,CANVAS.width,CANVAS.height);

}

setTimeout(function() {
	getPal();
	getDim();
	doGrid(0);
	console.log(compos.palette);
	// console.log(Object.keys(compos.palette));
	drawResult();

}, 5000);