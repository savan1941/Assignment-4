var uname = document.getElementById("uname");
var email = document.getElementById("email");
var pwd = document.getElementById("pwd");
var number = document.getElementById("phnnumber");
var city = document.getElementById("city");
var country = document.getElementById("country");
var img = document.getElementById("img");

var signupform = document.getElementsByClassName("signupfrm");
console.log(signupform[0]);

signupform[0].addEventListener("submit", saveinlocal);
let flag = 0;

function saveinlocal(e) {
  e.preventDefault();

  let emil = 0;

  let session = [],
    flag1 = 0;
  if (localStorage.getItem("session") === null) {
    session = [];
  } else {
    session = JSON.parse(localStorage.getItem("session"));
  }

  let credential = {
    em: email.value,
    ps: pwd.value,
    name: uname.value,
    phone: number.value,
    city: city.value,
    country: country.value,
    loggedin: 0,
  };

  session.forEach(function (item) {
    if (email.value === item.em) {
      emil = 1;
    }
  });

  if (emil === 1) {
    alert("Email Id Already Exists! Please try new one...");
    email.value = "";
    pwd.value = "";
  } else {
    session.push(credential);
    localStorage.setItem("session", JSON.stringify(session));
    location.href = "./index.html";
  }
}
