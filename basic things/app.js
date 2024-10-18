const  URL = "https://cat-fact.herokuapp.com/facts";

// let promise = fetch(URL);
// console.log(promise);

const fact = document.querySelector("#fact");
const btn = document.querySelector("#btn");




const getFacts = async () => {
    console.log("Fetching data.....");
    let response = await fetch(URL);
    console.log(response);
    console.log("actual data");
    let data = await response.json();
    fact.innerText = data[0].text;
    
}

function getfacts(){
    fetch(URL)
     .then((response) => {
        return response.json();
     })
     .then((data) => {
        console.log(data);
        fact.innerText = data[1].text;
     });
}

btn.addEventListener("click",getfacts);
btn.addEventListener("click",getFacts);