var userDB = { p: "p" };

$.validator.addMethod("legal", function(value, element) {
  return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value);
 }, "Your password must contain at least 1 letter and 1 number");


$(function() {
    $("#signin-form").validate({
      
      rules: {
        firstname: {
        required: true,
        nowhitespace: true,
        lettersonly: true
        },
        lastname: {
        required: true,
        nowhitespace: true,
        lettersonly: true
        },
        email: {
          required: true,
          email: true
        },
        day:{
          min: 1,
        },
        month:{
          min: 1,
        },
        year:{
          min: 1,
        },
        username:{
          required: true,
        },
        password: {
          required: true,
          legal: true,
          minlength: 6
        }
      },
    
      messages: {
        day:{
          min: 'Your birth day is required'
        },
        month:{
          min: 'Your birth month is required'
        },
        year:{
          min: 'Your birth year is required'
        }
          
      },

      submitHandler: function(form) {
        var username = document.getElementById("username").value;
		    if (userDB[username] == undefined) {
            var password = document.getElementById("password").value;
            userDB[username]=password;
            document.getElementById("usernameLabel").innerHTML=username;
        $("#signInOK").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
	
       
		} else {
			$("#signInNotOK").modal();
		}
        
      }
    });
  });



  function checkUser(){
    var username = document.getElementById("usernameLogIn").value;
    var password = document.getElementById("passwordLogIn").value;
    if(userDB[username]==password){
      //set current user name????
      document.getElementById("usernameLabel").innerHTML=username;
      $("#logInOK").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
      });

    }else {
      $("#logInNotOK").modal();
	  }
  }
  
	