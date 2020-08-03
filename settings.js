
var rightDirection;
var leftDirection;
var upDirection;
var downDirection;



//RIGHT
function rightButtonclick(){
    document.getElementById("rk").innerHTML = "none";
    document.getElementById("errorR").style.display="none";
    document.getElementById("rightkey").style.background="#40bb77";
    document.getElementById("rightkey").style.color="black";
	document.addEventListener("keydown", rightKeyChoosen);
 }

function rightKeyChoosen(e) {
    let choosen= e.keyCode;
  
  if(choosen==leftDirection || choosen== upDirection|| choosen== downDirection){
      document.getElementById("errorR").style.display="block";
  }else{
      rightDirection=choosen;
      document.getElementById("rk").innerHTML = e.key ;
  }
  document.removeEventListener("keydown", rightKeyChoosen);
  document.getElementById("rightkey").style.background="none";
  document.getElementById("rightkey").style.color="white";
}

//LEFT
function leftButtonclick(){
    document.getElementById("lk").innerHTML = "none";
    document.getElementById("errorL").style.display="none";
    document.getElementById("leftkey").style.background="#40bb77";
    document.getElementById("leftkey").style.color="black";
	document.addEventListener("keydown", leftKeyChoosen);
 }

function leftKeyChoosen(e) {
    let choosen= e.keyCode;
  
  if(choosen==rightDirection || choosen== upDirection|| choosen== downDirection){
    document.getElementById("errorL").style.display="block";
  }else{
      leftDirection=choosen;
      document.getElementById("lk").innerHTML = e.key;
  }
  document.removeEventListener("keydown", leftKeyChoosen);
  document.getElementById("leftkey").style.background="none";
  document.getElementById("leftkey").style.color="white";
}

//UP
function upButtonclick(){
    document.getElementById("uk").innerHTML = "none";
    document.getElementById("errorU").style.display="none";
    document.getElementById("upkey").style.background="#40bb77";
    document.getElementById("upkey").style.background="black";
	document.addEventListener("keydown", upKeyChoosen);
 }

function upKeyChoosen(e) {
    let choosen= e.keyCode;
  if(choosen==rightDirection || choosen== leftDirection|| choosen== downDirection){
    document.getElementById("errorU").style.display="block";
  }else{
      upDirection=choosen;
      document.getElementById("uk").innerHTML = e.key;
  }
  document.removeEventListener("keydown", upKeyChoosen);
  document.getElementById("upkey").style.background="none";
  document.getElementById("upkey").style.color="white";
}

//DOWN
function downButtonclick(){
    document.getElementById("dk").innerHTML = "none";
    document.getElementById("errorD").style.display="none";
    document.getElementById("downkey").style.background="#40bb77";
    document.getElementById("downkey").style.color="black";
	document.addEventListener("keydown", downKeyChoosen);
 }

function downKeyChoosen(e) {
    let choosen= e.keyCode;
  
  if(choosen==rightDirection || choosen== leftDirection|| choosen== upDirection){
    document.getElementById("errorD").style.display="block";
  }else{
      downDirection=choosen;
      document.getElementById("dk").innerHTML = e.key;
  }
  document.removeEventListener("keydown", downKeyChoosen);
  document.getElementById("downkey").style.background="none";
  document.getElementById("downkey").style.color="white";
}

function differentName(){
         
        upDirection=38;
        downDirection=40;
        rightDirection=39;
        leftDirection=37;
        
        document.getElementById("uk").innerHTML = "ArrowUp" ;
        document.getElementById("dk").innerHTML = "ArrowDown";
        document.getElementById("rk").innerHTML = "ArrowRight";
        document.getElementById("lk").innerHTML = "ArrowLeft";

        document.getElementById("5point").value= getRandomColor();
        document.getElementById("10point").value= getRandomColor();
        while(document.getElementById("5point").value==document.getElementById("10point").value){
            document.getElementById("10point").value= getRandomColor();
        }
        document.getElementById("15point").value= getRandomColor();
        while(document.getElementById("5point").value==document.getElementById("15point").value){
            document.getElementById("15point").value= getRandomColor();
        }
        while(document.getElementById("10point").value==document.getElementById("15point").value){
            document.getElementById("15point").value= getRandomColor();
        }

        document.getElementById("numofBalls").value=50 +Math.floor(Math.random() * Math.floor(40));
        document.getElementById("gamelength").value=60+Math.floor(Math.random() * Math.floor(200));
        var index=1 +Math.floor(Math.random() * Math.floor(4));
       
        document.getElementById("numofGhosts").selectedIndex = index;
}
        
       
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }





$(function() {
    $("#setting-form").validate({
        rules: {
            numofBalls:{
                min: 50,
                max: 90,
                required: true,
                number: true
            },
            gamelength:{
                min: 60,
                required: true,
                number: true
            },
            numofGhosts:{
                min:1
            }
        },
        messages: {
            numofBalls:{
                min: "the minimal number of balls is 50",
                max: "the maximum number of balls is 90",
            },
            gamelength:{
                min: "the minimal game length is 60 seconds"
            },
            numofGhosts:{
                min: "please select number of ghosts in game"
            } 
        },
        submitHandler: function(form) {
            if(document.getElementById("dk").innerHTML == "none"|| document.getElementById("uk").innerHTML == "none"){
                $("#errorSettings").modal();
            }else if(document.getElementById("rk").innerHTML == "none"|| document.getElementById("lk").innerHTML == "none"){
                $("#errorSettings").modal();
            }else{
                //update key controllers
                rightKey=rightDirection;
                leftKey=leftDirection;
                upKey=upDirection;
                downKey=downDirection;
                //update ball number
                numOfFoffInBoard= parseInt(document.getElementById("numofBalls").value);
                //update game length
                maxTimeForGame=parseInt(document.getElementById("gamelength").value);
                //monsters
                var e = document.getElementById("numofGhosts");
                numofGhost=parseInt( e.options[e.selectedIndex].value);
                
                //colors
                color5point=  document.getElementById("5point").value;
                color10point= document.getElementById("10point").value;
                color15point= document.getElementById("15point").value;

                $("#gotogame").modal({
                    escapeClose: false,
                    clickClose: false,
                    showClose: false
                });
            }
            
          }
    });
 });


      