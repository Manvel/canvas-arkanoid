var canvas;
var ctx;
var ball, board, blocks;
var arenaHeight;
var arenaWidth;

function Ball(x, y, sx, sy, r) {
	this.x = x;
	this.y = y;
	this.sx = sx;
	this.sy = sy;
	this.r = r;
}

function Board(x, y, w, s) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.s = s;
	this.h = 8;
	this.move = false;
}

function Blocks(w, h, map) {
	this.w = w;
	this.h = h;
	this.map = map;
}

function clear() {
	ctx.clearRect(0, 0, arenaWidth, arenaHeight);
}


function draw() {
	clear();
	
	if((ball.x + ball.r + ball.sx > arenaWidth)||(ball.x+ball.sx<=0)) {
		ball.sx = -ball.sx;
	}
	if((ball.y + ball.sy <= 0)||(ball.y+ball.r+ball.sy>+arenaHeight)) {
		ball.sy = -ball.sy;
	}
	
	if((ball.y+ball.r>=board.y)&&(ball.y+ball.r+ball.sy<arenaHeight)
		&& (ball.x+ball.r/2>=board.x)&&(ball.x+ball.r/2<=board.x+board.w)) {
		ball.sy = -ball.sy;
		ball.sx = 10*(ball.x-(board.x+board.w/2))/board.w;
	}
	
	var row = Math.floor(ball.y/(blocks.h+2));
	var col = Math.floor(ball.x/(blocks.w+2));
	
	if(blocks.map[row] && blocks.map[row][col] == 1) {
		blocks.map[row][col] = 0;
		ball.sy = -ball.sy;
	}
	
	for(var i=0;i<blocks.map.length;i++) {
		for(var j=0;j<blocks.map[i].length;j++) {
			//console.log(blocks.map[i][j]);
			if(blocks.map[i][j] != 0) {
				ctx.beginPath();
			    ctx.rect(blocks.w*j, blocks.h*i, blocks.w, blocks.h);
			    ctx.fillStyle = 'orange';
			    ctx.fill();
			    ctx.lineWidth = 2;
			    ctx.strokeStyle = 'black';
			    ctx.stroke();
			}
		}
	}
	
	ball.x += ball.sx;
	ball.y += ball.sy;
	
	if((board.move=="right")&&(board.x+board.w < arenaWidth )) {
		board.x += board.s;
	} else if((board.move == "left")&&(board.x > 0)) {
		board.x -= board.s;
	}
	
	
	
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.fillRect(board.x, board.y, board.w, board.h);
	
	
}


(function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	arenaWidth = ctx.canvas.width;
	arenaHeight = ctx.canvas.height;
	
	ball = new Ball(arenaWidth/2, arenaHeight/2, 5, -5, 10);
	board = new Board(arenaWidth/2, arenaHeight-20, 100, 5);
	
	var bMap = ([
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0],
		[1,1,0,1,0,1,1,1,1,1],
	])
	
	blocks = new Blocks(80, 20, bMap);
	
	
	
	window.onkeydown = function (e) {
		if(e.keyCode == "39") {
			board.move = "right";
		} else if(e.keyCode == "37") {
			board.move = "left";
		}
	}
	window.onkeyup = function(e) {
		board.move = false;
	}
	
	interval = setInterval(draw, 20);
})(document);
