let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".option select");
let set1 = selects[0];
let set2 = selects[1];
let inpute = document.querySelectorAll(".input input");
let inpt1 = inpute[0];
let inpt2 = inpute[1];

let rates = {};

let requestURL = "https://v6.exchangerate-api.com/v6/c406c25205d54fa964d58862/latest/USD";

fetchRates();

async function fetchRates(){
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populateOption();
}

function populateOption() {
    let val = "";
    Object.keys(rates).forEach(Code =>{
        let str = '<option value="${code}">${code}</option>';
        val += str;
    })
    selects.forEach((s) => (s.innerHTML = val));
}

function convert(val, formCurr, toCurr){
    let v = (val/rates[formCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    return v1 == 0.0 ? v.toFixed(5) : v1;
}

function displayRate(){
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = '1 ${v1} equals';
    rate2.innerHTML = '${val} ${v2}';
}

resultBtn.addEventListener("click", () =>{
    let formCurr = sel1.value;
    let formVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    if (isNaN(formVal)){
        alert("Enter a Number");
    }else {
        let cVal = convert(formVal, formCurr, toCurr);
        inpt2.value = cVal;
    }
});

selects.forEach(s=>s.addEventListener("change", displayRate));

document.querySelector(".swap").assEventListener("click", ()=>{
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    set2.value = op1;
    set1.value = op2;

    displayRate();
})
