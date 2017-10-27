/**************************************************/
/*                  _         _           _       */
/*     _____      _(_)___ ___| |__   ___ | |_     */
/*    / __\ \ /\ / / / __/ __| '_ \ / _ \| __|    */
/*    \__ \\ V  V /| \__ \__ \ |_) | (_) | |_     */
/*    |___/ \_/\_/ |_|___/___/_.__/ \___/ \__|    */
/*                                                */
/**************************************************/

// View definitions
const LOGO      = document.querySelector("#logo");
const WIDTH     = document.querySelector("#width");
const HEIGHT    = document.querySelector("#height");
const GENERATE  = document.querySelector("#generate");
const CANVAS    = document.querySelector("#composition");
const PAL0      = document.querySelector("#pal-1");
const PAL1      = document.querySelector("#pal-2");
const PAL2      = document.querySelector("#pal-3");
const PAL3      = document.querySelector("#pal-4");
const PAL4      = document.querySelector("#pal-5");

// This is the object that will become our composition
var compos  = {};
var grid    = {};
var ctx     = CANVAS.getContext("2d");

// Get pallete from colormind and store it in the compos object
function getPallete() {
  var url = "http://colormind.io/api/";
  var data = {
    model : "default",
    // To get color suggestions with input from colormind, label blank fields with the "N" character:
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

// Clear the canvas and display the loading gif
function clearResult() { ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); }
function doLoader() { CANVAS.style.backgroundImage = "url(img/pencil-throbber.gif)"; }

// Get the canvas dimensions from the input fields
function getDim() {
  compos.width  = WIDTH.value;
  compos.height = HEIGHT.value;
}


function doGrid(type) {
  grid.width = compos.width;
  grid.height = compos.height;
  grid.type = type;
  if (type=0) {
    grid.zones = [0, 0, 1, 0.5][0, 0.5, 1, 1]
  }
}

// Function used for logging debug data to console
function displayComposData() {
  console.log(compos);
}


function drawResult() {
  var padding = 25;
  
  var pal = [
  "rgb("+compos.palette[0][0]+","+compos.palette[0][1]+","+compos.palette[0][2]+")",
  "rgb("+compos.palette[1][0]+","+compos.palette[1][1]+","+compos.palette[1][2]+")",
  "rgb("+compos.palette[2][0]+","+compos.palette[2][1]+","+compos.palette[2][2]+")",
  "rgb("+compos.palette[3][0]+","+compos.palette[3][1]+","+compos.palette[3][2]+")",
  "rgb("+compos.palette[4][0]+","+compos.palette[4][1]+","+compos.palette[4][2]+")",
  ];


  PAL0.style.backgroundColor = pal[0];
  PAL1.style.backgroundColor = pal[1];
  PAL2.style.backgroundColor = pal[2];
  PAL3.style.backgroundColor = pal[3];
  PAL4.style.backgroundColor = pal[4];

  LOGO.style.color = pal[0];
  GENERATE.style.color = pal[0];
  GENERATE.style.backgroundColor = pal[3];

  CANVAS.setAttribute("width", compos.width);
  CANVAS.setAttribute("height", compos.height);

  // Background
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

//Generate output, variables must be populated before the result is drawn.
function generate() {
  clearResult()
  doLoader();
  console.log("generating...");
  getPallete();
  getDim();

  setTimeout(function() {
    doGrid(0);
    drawResult();
    displayComposData();
  }, 1500);
}