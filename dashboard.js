let modal = document.getElementsByClassName("modal");
let container = document.getElementById("container");
let cancel = document.getElementById("cancel");
let editcancel = document.getElementById("editcancel");

// Get the button that opens the modal
var btn = document.getElementById("addagency");
console.log(btn);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.addEventListener("click", myfunc);

function myfunc() {
  console.log("savan");
  console.log(modal[0]);
  modal[0].style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", cancelfunc);
cancel.addEventListener("click", cancelfunc);
function cancelfunc() {
  modal[0].style.display = "none";
}

// for edit button

let editmodal = document.getElementsByClassName("editmodal");

var editspan = document.getElementsByClassName("editclose")[0];

function myfunc1() {
  console.log("savan");
  console.log(modal[0]);
  editmodal[0].style.display = "block";
}

function backfun() {
  editmodal[0].style.display = "none";
}

(async function Load() {
  const datas = await fetch(
    "https://api.airtable.com/v0/appPWO0x1lu3RrKgY/Table%201?&view=Grid%20view",
    {
      headers: {
        Authorization: "Bearer keyubAggt3UoesLi4",
      },
    }
  ).then((response) => response.json());
  // .then((data) => console.log(data.records[0].fields));
  console.log(datas);
  console.log(datas.records[0].fields.email);
  var airtable = document.getElementById("airtable");
  console.log(airtable);
  
  for (let i of datas.records) {
   
    var tblrow = document.createElement("tr");
    
    tblrow.innerHTML = ` <td >${i.fields.number}</td>
                    <td>${i.fields.name}</td>
                    <td>${i.fields.email}</td>
                    <td>${i.fields.phone}</td>
                    <td>${i.fields.city}</td>
                    <td>${i.fields.country}</td>
                    <td><button id="edit" onclick="myfunc1()">Edit</button>
                    <button id="delete">Delete</button></td>`;
    airtable.appendChild(tblrow);
  }
})();

var uname = document.getElementById("uname");
var email = document.getElementById("email");
var pwd = document.getElementById("pwd");
var phnnumber =  document.getElementById("phnnumber");
var city = document.getElementById("city");
var country = document.getElementById("country");
var count = 5;

var addform = document.getElementById("model-content");
console.log(addform);

addform.addEventListener("submit", saveinb);
  
  async function saveinb(e){
    e.preventDefault();
     console.log("savan");
    let response = await fetch('https://api.airtable.com/v0/appPWO0x1lu3RrKgY/Table%201', {
      method: 'POST',
      headers: {
          "Authorization": "Bearer keyubAggt3UoesLi4",
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'fields':{
              "number":count,
              "phone": phnnumber.value,
              "email": email.value,
              "country": country.value,
              "name": uname.value,
              "city": city.value
          }
          
      }) 
  }).then(res => res.json()).then(data => console.log(data));
  count++;
 
  
  uname.value = "";
  email.value = "";
  phnnumber.value = "";
  city.value = "";
  country.value = "";
  editmodal[0].style.display = 'none';
  // mainmain.style.opacity = "1";
  location.reload();
}  
  
//  let data =  fetch("https://api.airtable.com/v0/appPWO0x1lu3RrKgY/Table%201",{
//     method: 'POST',
//     headers: {
//         "Authorization": "Bearer keyubAggt3UoesLi4",
//         'Content-Type': 'application/json'
//   }

  

// });
