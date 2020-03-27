//bringing in DOM element
const balance_dom =document.getElementById('balance');
const money_plus_dom = document.getElementById('money-plus');
const money_minus_dom = document.getElementById('money-minus');
const ur_dom = document.getElementById('list');
const form_dom = document.getElementById('form');
const text_dom = document.getElementById('text');
const amount_dom = document.getElementById('amount');

//create a JSON array
// const trans = [
//     {id:1, text:'Flower', amount:-60},
//     {id:2, text:'Income', amount:2000},
//     {id:3, text:'Taxi', amount:-20},
//     {id:4, text:'Class', amount:-200},
// ];

let trans =[];

function getTransaction(e){
    e.preventDefault();

    //amount should be changed to number not string
    const tran = {id:generateID(),
                text: text_dom.value,
                amount: +amount_dom.value};

    trans.push(tran);
    addTransactionDOM(tran);
    updateBalance();

    text_dom.value='';
    amount_dom.value='';


}
function generateID(){
    return Math.floor(Math.random()*1000000000)
}

function addTransactionDOM(tran){
    const sign = tran.amount >=0 ? '+' :'-';
    const li_dom = document.createElement('li');
    li_dom.classList.add(tran.amount >=0 ? 'plus' :'minus');
    li_dom.innerHTML=`${tran.text} <span></span>${sign}${Math.abs(tran.amount)}</span>
    <button class='delete-btn' onclick='removeTrans(${tran.id});'>x</button>`;

    ur_dom.appendChild(li_dom);

}

function updateBalance(){
    const amount_array = trans.map((transaction)=>transaction.amount);
    const total = amount_array.reduce((acc,item)=>acc+=item,0).toFixed(2);
    const income = amount_array.filter(item=>item>=0)
                                .reduce((acc,item)=>acc+=item,0)
                                .toFixed(2);

    const expense = (amount_array
    .filter(item=>item<0)
    .reduce((acc,item)=>acc+=item,0)*-1)
    .toFixed(2);

    balance.innerText =`$${total}`;
    money_plus_dom.innerText=`$${income}`;
    money_minus_dom.innerText=`$${expense}`;


}

function removeTrans(id){
    trans = trans.filter(tran=>tran.id !==id);
    init();
}

function init(){
    ur_dom.innerHTML = '';
    trans.forEach((tran)=>addTransactionDOM(tran));
    updateBalance();

}

form.addEventListener('submit',getTransaction);

