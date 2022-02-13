let modal = document.getElementsByClassName("modal");
let container = document.getElementById("container");
let cancel = document.getElementById("cancel");
let editcancel = document.getElementById("editcancel");
let updatecancel = document.getElementById("updatecancel");
var airtable = document.getElementById("airtable"); 
var searchcountry = document.getElementById("searchcountry");
const currpage = document.getElementById('currpage');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const loader = document.getElementById('loader');
var user = document.getElementById("profile");
let adminbtn = document.getElementsByClassName("avatar")[0];



let serial = 1,
  clicked;
const entries = [];
let currpagecnt = 1;
let curruser;
loader.style.display = 'block';
previous.style.display = 'none';
next.style.display = 'none';
currpage.style.display = 'none';

//open admin panel
// adminbtn.addEventListener("click",adminprofile);
// function adminprofile(){
//   console.log("admin")
// }

// Get the button that opens the modal
var btn = document.getElementById("addagency");
console.log(btn);



// When the user clicks the button, open the modal
btn.addEventListener("click", myfunc);

function myfunc() {
  console.log("savan");
  console.log(modal[0]);
  modal[0].style.display = "block";
}


var span = document.getElementsByClassName("close")[0];


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

// for edit update back function
function updatebackfun(){
  updateModel.style.display = "none";
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

  console.log(airtable);

  datas.records.forEach(function (i) {
    var single = {
      number: serial,
      id: i.id,
      uname: i.fields.name,
      city: i.fields.city,
      country: i.fields.country,
      phnnumber: i.fields.phone,
      email: i.fields.email,
    };
    serial++;
    console.log(i.id);
    entries.push(single);

    // var tblrow = document.createElement("tr");

    // tblrow.innerHTML = ` <td >${i.fields.number}</td>
    //                 <td>${i.fields.name}</td>
    //                 <td>${i.fields.email}</td>
    //                 <td>${i.fields.phone}</td>
    //                 <td>${i.fields.city}</td>
    //                 <td>${i.fields.country}</td>
    //                 <td><button id="edit" class="updatebtn" onclick="myfunc1()">Edit</button>
    //                 </td>`;
    // airtable.appendChild(tblrow);
  });

  //hiding the loader
    if(entries.length >= 1){
      loader.style.display = 'none';
      previous.style.display = 'block';
      next.style.display = 'block';
      currpage.style.display = 'block';
    }
    if(currpagecnt == 1){
      previous.disabled = true;
      previous.style.opacity = "0.7";
      previous.style.cursor = "not-allowed"; 
    }
    if(currpagecnt != 1){
    previous.disabled = false;
    previous.style.opacity = "1";
    previous.style.cursor = "pointer"
    }

   
  if(currpagecnt != Math.ceil(entries.length/7)){
    next.disabled = false;
    next.style.opacity = "1";
    next.style.cursor = "pointer"
  }
    if(currpagecnt == Math.ceil(entries.length/7)){
    next.disabled = true;
    next.style.opacity = "0.7";
    next.style.cursor = "not-allowed"; 
  }

  currpage.innerText = currpagecnt;
  
  for(let j = currpagecnt-1; j < currpagecnt * 7 && j < entries.length; j++){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = entries[j].number;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = entries[j].uname;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = entries[j].email;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.innerText = entries[j].phnnumber;
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.innerText = entries[j].city;
    tr.appendChild(td5);

    const td6 = document.createElement("td");
    td6.innerText = entries[j].country;
    tr.appendChild(td6);

    const td7 = document.createElement("td");
    td7.innerHTML = `<button id="edit" class="updatebtn" onclick="myfunc1()">Edit</button>`;
    // const td8 = document.createElement("button");
    // td6.setAttribute("class", "updatebtn");
    // // td6.onclick = function() {editRow(item);};

    // td8.innerText = "Edit";
    // td7.appendChild(td8);
    tr.appendChild(td7);

    airtable.appendChild(tr);
     

  }


})();

// calling next page

function callnextpage(){
  currpagecnt++;
  currpage.innerText = currpagecnt;
  
  if(currpagecnt == Math.ceil(entries.length/7)){
    next.disabled = true;
    next.style.opacity = "0.7";
    next.style.cursor = "not-allowed"; 
  }
  if(currpagecnt != 1){
    previous.disabled = false;
    previous.style.opacity = "1";
    previous.style.cursor = "pointer"
  }
  if(currpagecnt != Math.ceil(entries.length/7)){
    next.disabled = false;
    next.style.opacity = "1";
    next.style.cursor = "pointer"
  }

  if(currpagecnt == 1){
    previous.disabled = true;
    previous.style.opacity = "0.7";
    previous.style.cursor = "not-allowed"; 
  }

  let child = airtable.childNodes;
  for (const i of child) {
      if(i.nodeName === "TR"){
          i.style.display = 'none';
      }
  }

  for(let j = (currpagecnt-1)*7; j < (currpagecnt * 7) && j < entries.length; j++){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = entries[j].number;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = entries[j].uname;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = entries[j].email;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.innerText = entries[j].phnnumber;
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.innerText = entries[j].city;
    tr.appendChild(td5);

    const td6 = document.createElement("td");
    td6.innerText = entries[j].country;
    tr.appendChild(td6);

    const td7 = document.createElement("td");
    td7.innerHTML = `<button id="edit" class="updatebtn" onclick="myfunc1()">Edit</button>`;
    // const td8 = document.createElement("button");
    // td6.setAttribute("class", "updatebtn");
    // // td6.onclick = function() {editRow(item);};

    // td8.innerText = "Edit";
    // td7.appendChild(td8);
    tr.appendChild(td7);

    airtable.appendChild(tr);
     

  }

}

function callpreviouspage(){
  console.log("sssss")
    currpagecnt--;
    currpage.innerText = currpagecnt;

  if(currpagecnt == 1){
      previous.disabled = true;
      previous.style.opacity = "0.7";
      previous.style.cursor = "not-allowed"; 
  }
  if(currpagecnt != 1){
      previous.disabled = false;
      previous.style.opacity = "1";
      previous.style.cursor = "pointer"
  }
  if(currpagecnt != Math.ceil(entries.length/7)){
      next.disabled = false;
      next.style.opacity = "1";
      next.style.cursor = "pointer"
  }
  if(currpagecnt == Math.ceil(entries.length/7)){
      next.disabled = true;
      next.style.opacity = "0.7"; 
      next.style.cursor = "not-allowed"; 
  }

  let child = airtable.childNodes;
  for(const i of child){
      if(i.nodeName === "TR"){
          i.style.display = 'none';
      }
  }

  let cnt = 1;
  for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = entries[j].number;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = entries[j].uname;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = entries[j].email;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.innerText = entries[j].phnnumber;
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.innerText = entries[j].city;
    tr.appendChild(td5);

    const td6 = document.createElement("td");
    td6.innerText = entries[j].country;
    tr.appendChild(td6);

    const td7 = document.createElement("td");
    td7.innerHTML = `<button id="edit" class="updatebtn" onclick="myfunc1()">Edit</button>`;
    // const td8 = document.createElement("button");
    // td6.setAttribute("class", "updatebtn");
    // // td6.onclick = function() {editRow(item);};

    // td8.innerText = "Edit";
    // td7.appendChild(td8);
    tr.appendChild(td7);

    airtable.appendChild(tr);
     

  }



}

var uname = document.getElementById("uname");
var email = document.getElementById("email");
var pwd = document.getElementById("pwd");
var phnnumber = document.getElementById("phnnumber");
var city = document.getElementById("city");
var country = document.getElementById("country");
var count = 5;

var addform = document.getElementById("model-content");
console.log(addform);

addform.addEventListener("submit", saveinb);

async function saveinb(e) {
  e.preventDefault();
  console.log("savan");
  let response = await fetch(
    "https://api.airtable.com/v0/appPWO0x1lu3RrKgY/Table%201",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer keyubAggt3UoesLi4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          number: serial,
          phone: phnnumber.value,
          email: email.value,
          country: country.value,
          name: uname.value,
          city: city.value,
        },
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
  serial++;

  uname.value = "";
  email.value = "";
  phnnumber.value = "";
  city.value = "";
  country.value = "";
  editmodal[0].style.display = "none";
  // mainmain.style.opacity = "1";
  location.reload();
}

//edit form

var ediform = document.getElementById("edit-content");

window.onclick = function (e) {
  if (e.target.classList.contains("updatebtn")) {
    
    
    let par = e.target.parentElement.parentElement.childNodes;
    console.log(par)
    // clicked = Number(par[1].innerText);
     clicked = par[2].innerText;
    console.log(clicked);

    const phone = document.getElementById("editphnnumber");
    phone.value = par[3].innerText;

    const email = document.getElementById("editemail");
    email.value = par[2].innerText;
    console.log(email.value);

    const city = document.getElementById("editcity");
    city.value = par[4].innerText;
    console.log(city.value);

    const country = document.getElementById("editcountry");
    country.value = par[5].innerText;
    console.log(country.value);

    const name = document.getElementById("editname");
    name.value = par[1].innerText;
    console.log(name.value);
  }
};

editform.addEventListener("submit", updateinb);

async function updateinb(e) {
  console.log("ssss");
  const editname = document.getElementById("editname");
  const editemail = document.getElementById("editemail");
  const editphnnumber = document.getElementById("editphnnumber");
  const editcity = document.getElementById("editcity");
  const editcountry = document.getElementById("editcountry");
  console.log(entries[clicked - 1].id);

  e.preventDefault();
  let response = await fetch(
    `https://api.airtable.com/v0/appPWO0x1lu3RrKgY/Table%201/${
      entries[clicked - 1].id
    }`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer keyubAggt3UoesLi4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          number: entries[clicked - 1].number,
          phone: editphnnumber.value,
          email: editemail.value,
          country: editcountry.value,
          name: editname.value,
          city: editcity.value,
        },
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
  editmodal[0].style.display = "none";
  
  location.reload();
}

// sort by country

function sortbycountry() {
  let scountry = document.getElementById("scountry");

  let child = airtable.childNodes;

  for (let i of child) {
    if (i.nodeName === "TR") {
      // scountry.classList.remove("show");
      i.style.display = "none";
    }
  }

  if (scountry.classList.contains("show")) {
    scountry.innerHTML = `<i class="fas fa-arrow-down"></i>`;

    entries.sort((a, b) => {
      if (a.country > b.country) return 1;
      else if (a.country < b.country) return -1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    scountry.classList.remove("show");
  } else {
    scountry.innerHTML = `<i class="fas fa-arrow-up"></i>`;

    entries.sort((a, b) => {
      if (a.country > b.country) return -1;
      else if (a.country < b.country) return 1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    scountry.classList.add("show");
  }
}

//sort by city
function sortbycity() {
  let scity = document.getElementById("scity");

  let child = airtable.childNodes;

  for (let i of child) {
    if (i.nodeName === "TR") {
      // scountry.classList.remove("show");
      i.style.display = "none";
    }
  }

  if (scity.classList.contains("show1")) {
    scity.innerHTML = `<i class="fas fa-arrow-down"></i>`;

    entries.sort((a, b) => {
      if (a.city > b.city) return 1;
      else if (a.city < b.city) return -1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    scity.classList.remove("show1");
  } else {
    scity.innerHTML = `<i class="fas fa-arrow-up"></i>`;

    entries.sort((a, b) => {
      if (a.city > b.city) return -1;
      else if (a.city < b.city) return 1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    scity.classList.add("show1");
  }
}

//sort by name

function sortbyname() {
  let sname = document.getElementById("sname");
  console.log(sname);

  let child = airtable.childNodes;

  for (let i of child) {
    if (i.nodeName === "TR") {
      // scountry.classList.remove("show");
      i.style.display = "none";
    }
  }

  if (sname.classList.contains("show3")) {
    sname.innerHTML = `<i class="fas fa-arrow-down"></i>`;

    entries.sort((a, b) => {
      if (a.uname > b.uname) return 1;
      else if (a.uname < b.uname) return -1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    sname.classList.remove("show3");
  } else {
    sname.innerHTML = `<i class="fas fa-arrow-up"></i>`;

    entries.sort((a, b) => {
      if (a.uname > b.uname) return -1;
      else if (a.uname < b.uname) return 1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    sname.classList.add("show3");
  }
}

//sort by number

function sortbynumber() {
  let snumber = document.getElementById("snumber");
  

  let child = airtable.childNodes;

  for (let i of child) {
    if (i.nodeName === "TR") {
      // scountry.classList.remove("show");
      i.style.display = "none";
    }
  }

  if (snumber.classList.contains("show4")) {
    snumber.innerHTML = `<i class="fas fa-arrow-down"></i>`;

    entries.sort((a, b) => {
      if (a.number > b.number) return 1;
      else if (a.number < b.number) return -1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    snumber.classList.remove("show4");
  } else {
    snumber.innerHTML = `<i class="fas fa-arrow-up"></i>`;

    entries.sort((a, b) => {
      if (a.number > b.number) return -1;
      else if (a.number < b.number) return 1;
      else return 0;
    });
    currpagecnt = currpage.innerText;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

    snumber.classList.add("show4");
  }
}


// search by country

function search(){
  let input = searchcountry;
  
  
  let child = airtable.childNodes;

  for (let i of child) {
    if (i.nodeName === "TR") {
      // scountry.classList.remove("show");
      i.style.display = "none";
    }
  }

  if(input.value == ""){
    next.style.display = 'block';
    previous.style.display = 'block';
    currpage.style.display = 'block';
    currpage.innerText = currpagecnt;
    for (let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerText = entries[j].number;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = entries[j].uname;
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = entries[j].email;
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      td4.innerText = entries[j].phnnumber;
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.innerText = entries[j].city;
      tr.appendChild(td5);

      const td6 = document.createElement("td");
      td6.innerText = entries[j].country;
      tr.appendChild(td6);

      const td7 = document.createElement("td");
      const td8 = document.createElement("button");
      td6.setAttribute("class", "btn");
      // td6.onclick = function() {editRow(item);};

      td8.innerText = "Edit";
      td7.appendChild(td8);
      tr.appendChild(td7);

      airtable.appendChild(tr);
    }

   
  }

  else{
        next.style.display = 'none';
        previous.style.display = 'none';
        currpage.style.display = 'none';
    for(let j = 0; j<entries.length; j++){
        if(entries[j].country.toLowerCase().startsWith(input.value.toLowerCase())){
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.innerText = entries[j].number;
          tr.appendChild(td1);
    
          const td2 = document.createElement("td");
          td2.innerText = entries[j].uname;
          tr.appendChild(td2);
    
          const td3 = document.createElement("td");
          td3.innerText = entries[j].email;
          tr.appendChild(td3);
    
          const td4 = document.createElement("td");
          td4.innerText = entries[j].phnnumber;
          tr.appendChild(td4);
    
          const td5 = document.createElement("td");
          td5.innerText = entries[j].city;
          tr.appendChild(td5);
    
          const td6 = document.createElement("td");
          td6.innerText = entries[j].country;
          tr.appendChild(td6);
    
          const td7 = document.createElement("td");
          const td8 = document.createElement("button");
          td6.setAttribute("class", "btn");
          // td6.onclick = function() {editRow(item);};
    
          td8.innerText = "Edit";
          td7.appendChild(td8);
          tr.appendChild(td7);
    
          airtable.appendChild(tr);
        }

    }

  }

}

//session management

function sessionmanage(){
    let flag = 0;
    let session = [];

    if(localStorage.getItem("session") === null){
        session = [];
    }
    else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    session.forEach(function(item){
      
      if(item.loggedin == 1){
        curruser = item.name;
        flag = 1;
      }
    });

    if(flag == 0){
      location.href = './index.html';
  }

  user.innerHTML = ` <img src="download.png" alt="Avatar" class="avatar" onclick="updateuser()" /> <h3 style = "font-size : 20px">${curruser}</h3>`;
}
sessionmanage();


let updateModel = document.getElementById("updateModel");
console.log(updateModel)


function updateuser(){
 
  updateModel.style.display = "block";
  const name = document.getElementById('updatename');
  const email = document.getElementById('updateemail');
  const password = document.getElementById('updatepwd');
  const phone = document.getElementById('updatephnnumber');
  const address = document.getElementById('updatecity');
  const country = document.getElementById('updatecountry'); 

  let session = [];

  if(localStorage.getItem("session") === null){
    session = [];
  }
  else{
    session = JSON.parse(localStorage.getItem('session'));

    session.forEach((item) => {
      if(item.loggedin === 1){
          name.value = item.name;
          email.value = item.em;
          address.value = item.city;
          country.value = item.country;
          password.value = item.ps;
          phone.value = item.phone;
          
      }
    })
  }
}

//update admin form

// let updateadminform = document.getElementById("updateform");
// console.log(updateadminform);

// updateadminform.addEventListener("submit",updateinlocalstorage);

// function updateinlocalstorage(){
//   console.log("adminform");
// }

function logout(){
      let session = [];

      if(localStorage.getItem("session") === null){
        session = [];
      }
      else{
        session = JSON.parse(localStorage.getItem('session'));
      }

      session.forEach(function(item){
        if(item.loggedin == 1){
          item.loggedin = 0;
          return;
        }
      });

      localStorage.setItem("session", JSON.stringify(session));
      location.href = './index.html';
}



