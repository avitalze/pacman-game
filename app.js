var context;
var shape = new Object();
var board ;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var timePassFromDie;
var dieTime;
var maxTimeForGame =100;// get from user - max time for thr game
var numOfFoffInBoard=50; //get from user
var rightKey=39;
var leftKey=37;
var upKey=38;
var downKey=40;
var numofGhost=4; // ? get real name -OR
var lastMoveCellG1;
var color5point="red";
var color10point="yellow";
var color15point="blue";
var startgame=false;
var temp;
var numOfLives=5;
var foodOnBoardUpdate;
var ghostArray = [];
var magicDrawerCount=0;
var timeDrowGhost;
var firstGame=true;


var gameBackroundSong= new Audio("songs/pac-man-intro.mp3");
gameBackroundSong.loop=true;
var totalDeathMusic= new Audio("songs/pacman-death.mp3");
totalDeathMusic.loop=false;
var lifeLostMusic= new Audio("songs/pacman-lostlife.mp3");
lifeLostMusic.loop=false;
var victoryMusic= new Audio("songs/victory-song.mp3");
victoryMusic.loop=false;
var chompMusic= new Audio("songs/chomp.mp3");
chompMusic.loop=false;
var magic50Music= new Audio("songs/50 points.mp3");
magic50Music.loop=false;
var clockPillMusic= new Audio("songs/clockMusic.mp3"); 
clockPillMusic.loop=false;
var timeupMusic= new Audio("songs/tada.mp3");
timeupMusic.loop=false;


$(document).ready(function() {
	context = canvas.getContext("2d");
	
	//var cellSize = canvas.height/10;
	//context.rotate(Math.PI/2);
});


var face=new Object(); // fce of pacman move with direction
face.y=1.85;
face.x=0.15;

var ghost=new Object();

var magic50;

var clockPill= new Object();

var pill1;


function Start() { // setup -first drow 
	magic50=new Object();
	pill1=new Object();
	clockPill=new Object();
	if(startgame){
		board = [
			[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
			[0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0],
			[0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
			[0, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
			[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
		];
	UpdateSettingLabels();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = numOfFoffInBoard; //num of points of food 
	var numof5points=Math.round(0.6*food_remain);
	var numof15points= Math.round(0.3*food_remain);
	var numof25points= food_remain-numof5points-numof15points;
	var pacman_remain = 1; 
	start_time = new Date();
	firstGame=true;
	shape.i = 1;
	shape.j = 1;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			 if(board[i][j]==0) { 
				var randomNum = Math.random(); 
				if (randomNum <= (1.0 * food_remain) / cnt) { // if bigger then x- we will drow food
					var randomNum2 = Math.random(); 
					if(randomNum2>=0 && randomNum2<0.6 && numof5points>0){ //  60% of food of 5 points
						board[i][j] = 11;
						numof5points--;
						food_remain--;
					}
					else if(randomNum2>=0.6 && randomNum2<0.9 &&numof15points>0){ //  30% of food of 15 points
						board[i][j] = 12;
						numof15points--;
						food_remain--;
					}
					else if(numof25points>0){
						board[i][j] = 13; // 10% of food of 25 points
						numof25points--;
						food_remain--;
					}
					
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;// pacman - difult #
				} else {
					board[i][j] = 0; // empty
				}
				cnt--;
			}
		}
	}
	var emptyCell ;
	while (numof5points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11; //food
		food_remain--;
		numof5points--;
	}
	while (numof15points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 12; //food
		food_remain--;
		numof15points--;
	}
	while (numof25points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 13; //food
		food_remain--;
		numof25points--;
	}
	if(pacman_remain!=0){
		emptyCell = findRandomEmptyCell(board);
		shape.i=emptyCell[0];
		shape.j=emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2; //pacman
		pacman_remain--;
	}
	//delete the threes
	board[0][0]=0;
	board[0][11]=0;
	board[11][0]=0;
	board[11][11]=0;
	putGhostsOnBord(); //paint ghosts
	
	//magic 50
	emptyCell=findRandomEmptyCell(board);
	magic50.lastItem=board[emptyCell[0]][emptyCell[1]];
	magic50.i=emptyCell[0];
	magic50.j=emptyCell[1];  
	board[emptyCell[0]][emptyCell[1]] = 50;

	emptyCell=findRandomEmptyCell(board);
	pill1.i=emptyCell[0];
	pill1.j=emptyCell[1];  
	pill1.canDraw=true;
	board[emptyCell[0]][emptyCell[1]] = 60;
 
	// clock pill
	emptyCell=findRandomEmptyCell(board);
	clockPill.lastItem=board[emptyCell[0]][emptyCell[1]];
	clockPill.i=emptyCell[0];
	clockPill.j=emptyCell[1];  
	board[emptyCell[0]][emptyCell[1]] = 7;



	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	   

	gameBackroundSong.play();
	interval = setInterval(UpdatePosition, 120); // 180
	//interval = setInterval(intervalFancs, 120); 
}
}

function intervalFancs(){
	UpdatePosition();
	UpdatePositionGhost();
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 11 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 11 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}

function putGhostsOnBord(){
	var maxLen=board[0].length-1;
	for(var v=0;v<numofGhost;v++){
		ghostArray[v]=new Object();
		if(v==0){
			//lastMoveCellG1`=board[0][0]; // ????????????
			ghostArray[v].lastItem=0;
			ghostArray[v].lastMove=0;
			board[0][0]= 3;
			ghostArray[v].x=0;
			ghostArray[v].y=0;
		}else if(v==1){
			ghostArray[v].lastItem=0;
			ghostArray[v].lastMove=0;
			board[0][maxLen]=3;
			ghostArray[v].x=0;
			ghostArray[v].y=maxLen;
		}
		else if(v==2){
			ghostArray[v].lastItem=0;
			ghostArray[v].lastMove=0;
			board[maxLen][0]=3;
			ghostArray[v].x=maxLen;
			ghostArray[v].y=0;
		}
		else if(v==3){
			ghostArray[v].lastItem=0;
			ghostArray[v].lastMove=0;
			board[maxLen][maxLen]=3;
			ghostArray[v].x=maxLen;
			ghostArray[v].y=maxLen;
		}
	}
	
}

function GetKeyPressed() {
	if (keysDown[upKey]) { // up ---------> put key the user chose
		return 1;
	}
	if (keysDown[downKey]) { // down ---------> put key the user chose
		return 2;
	}
	if (keysDown[leftKey]) { // left ---------> put key the user chose
		return 3;
	}
	if (keysDown[rightKey]) { // right ---------> put key the user chose
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 40 + 20;
			center.y = j * 40 + 20;
			if (board[i][j]==2) { //if is  #
				context.beginPath();
				context.arc(center.x, center.y, 20, (Math.PI*face.x), (Math.PI*face.y)); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 7, center.y - 10, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			// else if (board[i][j] == 3) { //ghost
			// 	 var img=document.getElementById("ghost");
			// 	 context.drawImage(img, ghost.x*60, ghost.y*60,60,60);
			// } 
			else if (board[i][j] == 11) { //if is food of 5 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color5point; //color
				context.fill();
			} else if (board[i][j] == 4) { // if is wall 
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 12) { //if is red food - food of 15 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color10point; //color
				context.fill();
			} else if (board[i][j] == 13) { //if is food of 25 points - blue
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color15point; //color
				context.fill();
			}
		}
	}
	//drow ghosts
	var img=document.getElementById("ghost");
	for(var k=0;k<numofGhost;k++){
		context.drawImage(img, ghostArray[k].x*40, ghostArray[k].y*40,40,40);
	}
	timeDrowGhost= new Date();
	//draw apple
	if(magic50 !=undefined){
	var appleImg= document.getElementById("apple");
	context.drawImage(appleImg, magic50.i*40, magic50.j*40,40,40);
	}
	//draw pill
	if(pill1.canDraw){
		var pillImg= document.getElementById("pill");
		context.drawImage(pillImg, pill1.i*40, pill1.j*40,40,40);
	}
	//draw clock
	if(clockPill !=undefined){
		var clockImg= document.getElementById("clock"); 
		context.drawImage(clockImg, clockPill.i*40, clockPill.j*40,40,40);
		}
}

function bestMoveOfGhost(){
	
	for(var q=0;q<numofGhost;q++){
		var minDistance =1.7976931348623157E+10308;//Infinity;
		var currBestMove;
		var Ysub=Math.abs(shape.j- ghostArray[q].y);
		var Xsub= Math.abs(shape.i-ghostArray[q].x);
		//var angle=Math.atan(opposite / adjacent);
		var maxLenBoard=board[0].length-1; 

		
		 // down
		if (ghostArray[q].y < maxLenBoard && board[ghostArray[q].x][ghostArray[q].y + 1] != 4 && board[ghostArray[q].x][ghostArray[q].y + 1] != 50 &&board[ghostArray[q].x][ghostArray[q].y + 1] != 60 && board[ghostArray[q].x][ghostArray[q].y + 1] != 7 && board[ghostArray[q].x][ghostArray[q].y + 1] != 3 ) { 
				var rightYCalc=Math.abs(shape.j-(ghostArray[q].y+1));	
				var down= Xsub+rightYCalc;
				if(down<minDistance && ghostArray[q].lastMove!=7 ){
					minDistance=down;
					ghostArray[q].lastMove=ghostArray[q].bestMove;
					currBestMove=6;
					//isChanges = true
				}	
			
			}
		// up
		if(ghostArray[q].y > 0 && board[ghostArray[q].x][ghostArray[q].y - 1] != 4 && board[ghostArray[q].x][ghostArray[q].y - 1] != 50 && board[ghostArray[q].x][ghostArray[q].y - 1] != 60 && board[ghostArray[q].x][ghostArray[q].y - 1] != 7  && board[ghostArray[q].x][ghostArray[q].y - 1] != 3 ){
			var leftYCalc=Math.abs(shape.j-(ghostArray[q].y-1));
			var up=Xsub+leftYCalc;
			if(up<minDistance&& ghostArray[q].lastMove!=6){
				minDistance=up;
				ghostArray[q].lastMove=ghostArray[q].bestMove;
				currBestMove=7;
				//isChanges = true
			}	
		} 
		// left  
		if(ghostArray[q].x > 0 && board[ghostArray[q].x - 1][ghostArray[q].y] != 4 && board[ghostArray[q].x - 1][ghostArray[q].y] != 50 && board[ghostArray[q].x - 1][ghostArray[q].y] != 60 && board[ghostArray[q].x - 1][ghostArray[q].y] != 7 && board[ghostArray[q].x - 1][ghostArray[q].y] != 3){
			var upXCalc=Math.abs(shape.i-(ghostArray[q].x-1));
			var left=Ysub+upXCalc;
			if(left<minDistance && ghostArray[q].lastMove!=9){
				minDistance=left;
				ghostArray[q].lastMove=ghostArray[q].bestMove;
				currBestMove=8;
				//isChanges = true
			}
		}
		// right ? 
		if(ghostArray[q].x < maxLenBoard && board[ghostArray[q].x + 1][ghostArray[q].y] != 4 && board[ghostArray[q].x + 1][ghostArray[q].y] != 50 && board[ghostArray[q].x + 1][ghostArray[q].y] != 60 && board[ghostArray[q].x + 1][ghostArray[q].y] != 7 && board[ghostArray[q].x + 1][ghostArray[q].y] != 3){
			var downXCala=Math.abs(shape.i-(ghostArray[q].x+1));
			var right=Ysub+downXCala;
			if(right<minDistance && ghostArray[q].lastMove!=8){
				minDistance=right;
				ghostArray[q].lastMove=ghostArray[q].bestMove;
				currBestMove=9;
				//isChanges = true
			}
		}
		var x;
		ghostArray[q].bestMove=currBestMove;
	}
	return true; // calc witch durction is beter - up down left right
	//if up is the best way -> return 1 , right->rturn 2
	// 		left->3 , right->4
}

function UpdatePositionGhost() {

	var nextMove= bestMoveOfGhost();
	for(var w=0;w<numofGhost;w++){
		board[ghostArray[w].x][ghostArray[w].y] = ghostArray[w].lastItem; // put last object: lastMoveCellG1
		var ghostMove= ghostArray[w].bestMove;
		if (ghostMove == 7) { // (up on baord!!) (like pacman-in paint)
				ghostArray[w].lastItem=board[ghostArray[w].x][ghostArray[w].y-1];
				ghostArray[w].y=ghostArray[w].y-1;
			}
		if (ghostMove == 6) { //  (right on baord!!) (down like pacman-in paint)
				ghostArray[w].lastItem=board[ghostArray[w].x][ghostArray[w].y + 1];
				ghostArray[w].y=ghostArray[w].y+1;
			}
		if (ghostMove == 8) { //( on baord!!!) (left like pacman-on paint)
				ghostArray[w].lastItem=board[ghostArray[w].x-1][ghostArray[w].y];
				ghostArray[w].x=ghostArray[w].x-1;
			}
		if (ghostMove == 9) {//( on baord!!)  (right like pacmanon-on paint)
				ghostArray[w].lastItem=board[ghostArray[w].x+1][ghostArray[w].y]; 
				ghostArray[w].x=ghostArray[w].x+1;
			}
		board[ghostArray[w].x][ghostArray[w].y] = 3; 
	}
}

function UpdateMagic50Position(){
	board[magic50.i][magic50.j] = magic50.lastItem;
	var directiongood=false;
	var direction;
	while( !directiongood){
		direction=Math.floor(Math.random() * 7);
		if (direction== 1) { // up 
			if (magic50.j > 0 && board[magic50.i][magic50.j - 1] != 4 && board[magic50.i][magic50.j - 1] != 3 && board[magic50.i][magic50.j - 1] !=2) {
			magic50.lastItem=board[magic50.i][magic50.j-1];
			magic50.j--;
			directiongood=true;
			}
		}
		if (direction == 2) { // down
			if (magic50.j < 11 && board[magic50.i][magic50.j + 1] != 4 && board[magic50.i][magic50.j + 1] != 3 && board[magic50.i][magic50.j + 1] != 2) {
			magic50.lastItem=board[magic50.i][magic50.j+1];
			magic50.j++;
			directiongood=true;
			}
		}	
	if (direction == 3) { //left
		if (magic50.i > 0 && board[magic50.i - 1][magic50.j] != 4 &&board[magic50.i - 1][magic50.j] != 3 &&board[magic50.i - 1][magic50.j] != 2) {
			magic50.lastItem=board[magic50.i-1][magic50.j];
			magic50.i--;
			directiongood=true;
		}
	}
	if (direction == 4) {//right
		if (magic50.i < 11 && board[magic50.i + 1][magic50.j] != 4 && board[magic50.i + 1][magic50.j] != 3 && board[magic50.i + 1][magic50.j] != 2) {
			magic50.lastItem=board[magic50.i+1][magic50.j];
			magic50.i++;
			directiongood=true;
		}
	}
	if(direction==0 ||directiongood==5 || direction==6){
		directiongood=true;
	}
	}
	board[magic50.i][magic50.j]  = 50; 
	
}

function UpdatePosition() { 
	startIntervalTime=new Date();
	magicDrawerCount++;
	board[shape.i][shape.j] = 0;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	timePassFromDie= (currentTime-timeDrowGhost)/1000;
	var x = GetKeyPressed(); // last move of user
	var pacmanEatenByGhost=false;
	if(time_elapsed>= maxTimeForGame){
		gameBackroundSong.pause();
		timeupMusic.play();
		window.clearInterval(interval);
		startgame=false;
		firstGame=false;
		if(score<100){
			document.getElementById("lessthan100").innerHTML= "You are better than "+score+" points!";
			$("#timeUplessthan100").modal();
		}
		else{
			document.getElementById("morethan100timeup").innerHTML= "Times up!!! You have "+score+" points!!";
			$("#timeUpMorethan100").modal();
		}
	}
	foodOnBoardUpdate=getNumOfFoodInBoard();
	if (foodOnBoardUpdate == 0) { 
		startgame=false;
		gameBackroundSong.pause();
		victoryMusic.play();
		window.clearInterval(interval);
		document.getElementById("morethan100").innerHTML= "Winner!!!!!! You have "+score+" points!!";
		$("#winnerMoreThan100Points").modal();

	}
	for(var index=0;index<numofGhost;index++){
		if(shape.i== ghostArray[index].x && shape.j==ghostArray[index].y){
			pacmanEatenByGhost=true;
		}
	}
	if(pacmanEatenByGhost){// end of game
		score= score-10;
		$("#life"+numOfLives+"").css('opacity', 0); // hide
		numOfLives=numOfLives-1;
		window.clearInterval(interval);
		gameBackroundSong.pause();
		gameBackroundSong.currentTime = 0;
		firstGame=false;
		if(numOfLives==0){// end of final game
			startgame=false;
			totalDeathMusic.play();
			document.getElementById("endofgamepoints").innerHTML= "Loser!!!!!! You have "+score+" points";
			$("#endOfGameNoLives").modal();
		}
		else{//start new game in curr
			lifeLostMusic.play();
			$("#pacmanDie").modal({
				escapeClose: false,
				clickClose: false,
				showClose: false
			  });

		}
	}
	else{
		var faceDirection=24;
		if (x == 1) { // up 
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			//faceDirection=21;//'pacmanUp';
			face.y=3.35;
			face.x=1.6; 
			shape.j--;
		}
	}
		if (x == 2) { // down
			if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			//faceDirection=22;//'pacmanDown';
			face.y=2.3;
			face.x=0.7; 
			shape.j++;
		}
	}	
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			//faceDirection=23;//'pacmanLeft';
			face.y=2.9;
			face.x=1.1; 
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
			//faceDirection=24;//'pacmanRight';
			face.y=1.85;
			face.x=0.15; 
			shape.i++;
		}
	}

	if (board[shape.i][shape.j] == 11) { // chek the type of food! update score
			score=score+5;
			
	}
		if(board[shape.i][shape.j] == 12){
			score=score+15;
			
	}
		if(board[shape.i][shape.j] == 13){
			score=score+25;
			
	}
	if(board[shape.i][shape.j] == 50){//eat magic 50
		magic50Music.play();
		score=score+50;
		if(magic50.lastItem==11){
			score=score+5;
			
		}else if(magic50.lastItem==12){
			score=score+15;
			
		}else if(magic50.lastItem==13){
			score=score+25;
			
		}
		magic50=undefined;
	}
	if(board[shape.i][shape.j] == 60){
		pill1.canDraw=false;
		chompMusic.play();
		if(numOfLives<5){
			numOfLives++;
			$("#life"+numOfLives+"").css('opacity', 1); // show
		}
	}
	if(board[shape.i][shape.j] == 7){//eat clock pill 

		clockPillMusic.play();
		maxTimeForGame=maxTimeForGame+30; 
		clockPill=undefined;
	}
	board[shape.i][shape.j] = 2;  //!! #
	
	
	if (score >= 50 && time_elapsed <= 10) { //??? green yamii
		pac_color = "#d472b4";
	}

	if(magicDrawerCount % 3 == 0 && time_elapsed>=3 && firstGame==true){ //#################
		UpdatePositionGhost();
	}
	if( magicDrawerCount%3 ==0 && timePassFromDie>=0.116 &&firstGame==false){
		UpdatePositionGhost();
	}
	
	if(magic50 !=undefined && magicDrawerCount%5==0){
		UpdateMagic50Position();
	}
	
	if(magicDrawerCount%15==0){
		if(pill1.canDraw){
			board[pill1.i][pill1.j]=0;
			pill1.canDraw=false;
		}
		else{
			var randomNumber= Math.floor(Math.random() * 3);
			if(randomNumber==1){
				pill1.canDraw=true;
				var empty= findRandomEmptyCell(board);
				pill1.i=empty[0];
				pill1.j=empty[1];  
				board[empty[0]][empty[1]] = 60;
			}
		}
	}
	
	Draw();
	
	}
	
	
	
}

function pacmanDies(){
	$.modal.close();
	for(var i=0;i<numofGhost;i++){
		board[ghostArray[i].x][ghostArray[i].y] = ghostArray[i].lastItem; // put last object: lastMoveCellG1
	}
	board[shape.i][shape.j]=0;
	var indexes= findRandomEmptyCell(board);
	shape.i = indexes[0];
	shape.j = indexes[1];
	board[indexes[0]][indexes[1]]=2;
	firstGame==false;
	putGhostsOnBord();
	Draw();
	gameBackroundSong.play();
	interval = setInterval(UpdatePosition, 120);
}


function getNumOfFoodInBoard(){
	var numofFood=0;
	for(var n=0;n<12;n++){
		for(var m=0;m<12;m++){
			if(board[n][m]==11 || board[n][m]==12 || board[n][m]==13){
				numofFood++;
			}
		}
	}
	return numofFood;
}

function UpdateSettingLabels(){
	document.getElementById("rcontrol").innerHTML =document.getElementById("rk").innerHTML;
	document.getElementById("lcontrol").innerHTML =document.getElementById("lk").innerHTML;
	document.getElementById("ucontrol").innerHTML =document.getElementById("uk").innerHTML;
	document.getElementById("dcontrol").innerHTML =document.getElementById("dk").innerHTML;

	document.getElementById("ballLabel").innerHTML=numOfFoffInBoard;
	document.getElementById("timeLabel").innerHTML=maxTimeForGame;
	document.getElementById("ghostLabel").innerHTML=numofGhost;

	document.getElementById("5colorCircle").style.backgroundColor=color5point;
	document.getElementById("15colorCircle").style.backgroundColor=color10point;
	document.getElementById("25colorCircle").style.backgroundColor=color15point;
	



}


function StartNewGame(){
	$.modal.close();
	startgame=true;
	numOfLives=5;
	$("#life1").css('opacity', 1); // show all
	$("#life2").css('opacity', 1); // show all
	$("#life3").css('opacity', 1); // show all
	$("#life4").css('opacity', 1); // show all
	$("#life5").css('opacity', 1); // show all
	removeEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	removeEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	Start();
}