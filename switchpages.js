function clickSignIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").show();
}

function clickLogIn(){
	$("#WelcomeScreen").hide();
	$("#LogInPage").show();
}

function gotogame(){
	$("#WelcomeScreen").hide();
	$("#gamePage").show();
	startgame=true;
	Start();
}
function clickToSettings(){
	$("#LogInPage").hide();
	$("#Settings").show();
	$.modal.close();
}

function goToLogInFromSignIn(){
    $("#SignInPage").hide();
    $("#LogInPage").show();
    $.modal.close();
  }

 function menuToWelcome(){
	$("#WelcomeScreen").show();
	$("#SignInPage").hide();
	$("#LogInPage").hide();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
	if(interval !=undefined){
		window.clearInterval(interval);
	}
	gameBackroundSong.pause();
	gameBackroundSong.currentTime = 0;
 }

 function menuToSignIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").show();
	$("#LogInPage").hide();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
	if(interval !=undefined){
		window.clearInterval(interval);
	}
	gameBackroundSong.pause();
	gameBackroundSong.currentTime = 0;
 }

 function menuToLogIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").hide();
	$("#LogInPage").show();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
	if(interval !=undefined){
		window.clearInterval(interval);
	}
	gameBackroundSong.pause();
	gameBackroundSong.currentTime = 0;
 }

function menuToAbout(){
	$("#AboutPage").modal();
	if(interval !=undefined){
		window.clearInterval(interval);
	}
	gameBackroundSong.pause();
	gameBackroundSong.currentTime = 0;
}

function closeModal(){
	$.modal.close();
}

function closeAbout(){
	$.modal.close();
	if(startgame){
		interval = setInterval(UpdatePosition, 120);
		gameBackroundSong.play();

	}
}

function StartGame(){
	$("#gamePage").show();
	$("#Settings").hide();
	$.modal.close();
	startgame=true;
	Start();
}

function openNewGameModal(){
	if(interval != undefined){
		window.clearInterval(interval);
	}
	gameBackroundSong.pause();
	gameBackroundSong.currentTime = 0;
	$("#newGame").modal({
		escapeClose: false,
		clickClose: false,
		showClose: false
	  });
}


