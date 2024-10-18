
const country = {
    "AUD": "AU",
    "BGN": "BG",
    "BRL": "BR",
    "CAD": "CA",
    "CHF": "CH",
    "CNY": "CN",
    "CZK": "CZ",
    "DKK": "DK",
    "EUR": "EU",
    "GBP": "GB",
    "HKD": "HK",
    "HUF": "HU",
    "IDR": "ID",
    "ILS": "IL",
    "INR": "IN",
    "ISK": "IS",
    "JPY": "JP",
    "KRW": "KR",
    "MXN": "MX",
    "MYR": "MY",
    "NOK": "NO",
    "NZD": "NZ",
    "PHP": "PH",
    "PLN": "PL",
    "RON": "RO",
    "SEK": "SE",
    "SGD": "SG",
    "THB": "TH",
    "TRY": "TR",
    "USD": "US",
    "ZAR": "ZA"
  };



const BASE_URL = "https://api.frankfurter.app/latest?amount=1&from=INR&to=USD";

const dropdowns = document.querySelectorAll(".dropdown select"); 
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")



for(let select of dropdowns){
    for(currCode in country){
        let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value= currCode;
            if(select.name === "from" && currCode === "USD"){
                newOption.selected = "selected";
                
            }
            else if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
                
            }
            select.append(newOption);

        
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal  < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;

    let response = await fetch(URL);
    // console.log(response);
    // if (response.ok) {
    //     let data = await response.json();
    //     console.log(data);
    // } else {
    //     console.log(`Error: ${response.statusText}`);
    // }

    let data = await response.json();
    let rate = data.rates[toCurr.value];

    msg.innerText =  `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
    
    // console.log( data.rates[toCurr.value]);
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode= country[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , async(evt) => {
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load", () => {
    updateExchangeRate();
  });