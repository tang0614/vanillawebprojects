const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')

const amount_1 = document.getElementById('amount-one')
const amount_2 = document.getElementById('amount-two')

const rate = document.getElementById('rate')
const v = document.getElementById('value')


//Fetch exchange rate and update the DOM
function calc() {
    const currency_one =currencyEl_one.value;
    const currency_two =currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const rate = data.rates[currency_two]
        v.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
        amount_2.value = (amount_1.value * rate).toFixed(2)

    });
}

//Event listener
//select input--change, input--input
currencyEl_one.addEventListener('change', calc);
amount_1.addEventListener('input', calc);

currencyEl_two.addEventListener('change', calc);
amount_2.addEventListener('input', calc);


rate.addEventListener('click', ()=>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calc()
})

calc();
