const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const title = document.getElementById('title');
let data=[];

//fetch random user and add money
async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];
  const newUser ={
    name:`${user.name.first} ${user.name.last}`,
    //generate random money 
    money: Math.floor(Math.random() *1000000),
  };
  addData(newUser);
}


//add new obj to data arr
function addData(obj){
  data.push(obj);
  updateDOM();
}

//Update DOM
//set defualt parameter, if nothing is passing in
function updateDOM(providedData =data){
  //clear the p div

  main.innerHTML ='<div class="title" id="title"><h2>Person</<h2><h2>Wealth</h2></div>';
  //for each loop

  providedData.forEach(item=>{
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `${item.name}<strong>${formatMoney(item.money)}</strong>`;
    main.appendChild(element);
  });

}


function formatMoney(number){
  return('$'+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')); 
}
getRandomUser();

//event listener

function doubleMoney(){
  data = data.map(n => {
    return {...n, money:n.money*2};
  });
  updateDOM();
}

function sortbymoney(){
  data.sort((a,b)=> b.money-a.money);
  updateDOM();
}

function filterOut(){
  data = data.filter(n => n.money>=1000000);
  updateDOM();
}

function calculateWealth(){
  const sum = data.reduce((acc,current)=>(acc+current.money),0);
  const wealthEL =document.createElement('div');
  wealthEL.innerHTML=`Total Wealth: ${formatMoney(sum)}`;
  main.appendChild(wealthEL);
}
addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortbymoney)
showMillionairesBtn.addEventListener('click',filterOut)
calculateWealthBtn.addEventListener('click',calculateWealth)
