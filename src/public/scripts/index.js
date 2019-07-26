document.addEventListener('DOMContentLoaded',()=>{
    console.log("dom content loaded");

    document.getElementById("login-header").addEventListener('click',showLoginModalForm);
    document.getElementById("signup-header").addEventListener('click',showSignupModalForm);
    document.getElementsByClassName("login")[0].addEventListener('click',showLoginForm);
    document.getElementsByClassName("signup")[0].addEventListener('click',showSignupForm);
    document.getElementById("temp-cross").addEventListener('click',hideLoginSingupModal);
    document.getElementById("login-btn").addEventListener('click',submitLoginReq);
    document.getElementById("signup-btn").addEventListener('click',submitSignupReq)
});

var showLoginModalForm = ()=>{
    document.getElementsByClassName("modal-form")[0].style.display= "block";
    showLoginForm();
}

var showSignupModalForm = ()=>{
    document.getElementsByClassName("modal-form")[0].style.display= "block";
    showSignupForm();
}

var hideLoginSingupModal = ()=>{
    document.getElementsByClassName("modal-form")[0].style.display= "none";
}

var showLoginForm = ()=>{
    document.getElementsByClassName("signup")[0].style.background= "none";
    document.getElementsByClassName("login")[0].style.background= "white";
    document.getElementsByClassName("login-form")[0].style.display= "block";
    document.getElementsByClassName("signup-form")[0].style.display= "none";
}

var showSignupForm = ()=>{
    document.getElementsByClassName("signup")[0].style.background= "white";
    document.getElementsByClassName("login")[0].style.background= "none";
    document.getElementsByClassName("signup-form")[0].style.display= "block";
    document.getElementsByClassName("login-form")[0].style.display= "none";
}

var submitSignupReq = ()=>{
    const username = document.getElementById("user-name");
    const email = document.getElementById("signup-email");
    const password = document.getElementById("signup-password");
    const reCheckPassword= document.getElementById("signup-reenterpassword");
    const signupError = document.getElementById("signup-error");
    const singupSuccess =document.getElementById("signup-success");
    if(validateEmail(email.value) == true){
        if(password.value == reCheckPassword.value){
            let user ={};
            user.name = username.value;
            user.email = email.value;
            user.password = password.value;
            userSignup(user);
            //setTimeout(()=>{singupSuccess.style.opacity=0},4000);
        }else{
            singupSuccess.innerHTML="";
            console.log("password did not match");
            password.focus();
            signupError.innerHTML= "Password did not match";
            //setTimeout(()=>{signupError.style.opacity=0},4000);
        }
    }else{
        email.focus();
        singupSuccess.innerHTML="";
        signupError.innerHTML = "Invalid Email-id";
        //setTimeout(()=>{signupError.style.opacity=0},4000);
    }

}

const userSignup = (user)=>{
    fetch('/signup',{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response)=>response.json())
    .then(function (data) {
        if(data.status == 201){
            console.log('Request succeeded with JSON response', data.status);

            document.getElementById("signup-success").innerHTML = "Account created, Please Login to see your account";
            document.getElementById("signup-error").innerHTML = "";
            document.getElementsByName("signup-form")[0].reset();
        }
        else{
            console.log(data);
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

const submitLoginReq = ()=>{
    const email= document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const loginError = document.getElementById("login-error");
    const loginSuccess =document.getElementById("login-success");
    if(validateEmail(email.value) == true){
        let user ={};
        user.email = email.value;
        user.password = password.value;
        userLogin(user);
    }else{
        email.focus();
        loginSuccess.innerHTML="";
        loginError.innerHTML = "Invalid Email-id";
        //setTimeout(()=>{signupError.style.opacity=0},4000);
    }
}

const userLogin = (user)=>{
    fetch('/login',{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response)=>response.json())
    .then(function(data){
        if(data.status == 200){
            console.log('Request succeeded with JSON response', data.status);

            document.getElementById("login-success").innerHTML = "login successful";
            document.getElementById("login-error").innerHTML = "";
            window.location.replace('/dashboard');
        }
        else{
            console.log(data);
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function validateEmail(Email) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
  
    if(!Email.match(reEmail)) {
      return false;
    }
  
    return true;
  
}