var uname = document.getElementById("uname");
var email = document.getElementById("email");
var pwd = document.getElementById("pwd");
var number = document.getElementById("phnnumber");
var address = document.getElementById("address");
var country = document.getElementById("country");
var img = document.getElementById("img");

var form = document.getElementById("signupform");

form.addEventListener("submit", myfunction);

function myfunction(e) {
  e.preventDefault();
}

// function store() {
//   console.log(uname);
//   localStorage.setItem("name", uname.value);
//   localStorage.setItem("email", email.value);
//   localStorage.setItem("password", pwd.value);
//   localStorage.setItem("phone", number.value);
//   localStorage.setItem("address", address.value);
//   localStorage.setItem("country", country.value);
//   localStorage.setItem("img", img.value);
// }
