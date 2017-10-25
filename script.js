const CANVAS = document.querySelector("#composition");
var compos = {};
var grid = {};

function getPallete() {
	var url = "http://colormind.io/api/";
	var data = {
		model : "default",
		// To get color suggestions with input, label blank fields with the "N" character:
		// input : [[44,43,44],[90,83,82],"N","N","N"]
	}

	var http = new XMLHttpRequest();

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
			compos.palette =  palette;
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

function displayComposData() {
	console.log(compos);
	console.log(compos.palette);
}

function drawResult() {
	var padding = 25;
	var ctx = CANVAS.getContext("2d");
	var pal = [
	"rgb("+compos.palette[0][0]+","+compos.palette[0][1]+","+compos.palette[0][2]+")",
	"rgb("+compos.palette[1][0]+","+compos.palette[1][1]+","+compos.palette[1][2]+")",
	"rgb("+compos.palette[2][0]+","+compos.palette[2][1]+","+compos.palette[2][2]+")",
	"rgb("+compos.palette[3][0]+","+compos.palette[3][1]+","+compos.palette[3][2]+")",
	"rgb("+compos.palette[4][0]+","+compos.palette[4][1]+","+compos.palette[4][2]+")",
	];

	console.log(pal);

	CANVAS.setAttribute("width", compos.width);
	CANVAS.setAttribute("height", compos.height);

	ctx.fillStyle = pal[0];
	ctx.fillRect(0,0,CANVAS.width,CANVAS.height);

	ctx.fillStyle = pal[1];
	ctx.fillRect(0+padding,0+padding,CANVAS.width-padding*2,CANVAS.height-padding*2);

	ctx.fillStyle = pal[2];
	ctx.fillRect(0+padding*2,0+padding*2,CANVAS.width-padding*4,CANVAS.height-padding*4);

	ctx.fillStyle = pal[3];
	ctx.fillRect(0+padding*3,0+padding*3,CANVAS.width-padding*6,CANVAS.height-padding*6);

	ctx.fillStyle = pal[4];
	ctx.fillRect(0+padding*4,0+padding*4,CANVAS.width-padding*8,CANVAS.height-padding*8);

}


setInterval(function(){
	getPallete();
	getDim();

setTimeout(function() {
	displayComposData();
	doGrid(0);
	drawResult();
}, 500);

}, 15000);