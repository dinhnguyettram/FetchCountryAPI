let selectedCountry = document.getElementById('country-select');
selectedCountry.addEventListener('change', function(event) {
    console.log(event);
    countryValue = selectedCountry.value;
    getData(countryValue);
})


function getData(countryValue) {

    let index = document.querySelector('option').value;
    console.log(index);
    console.log(countryValue);

    const http = new HTTP;

    // Get Users
    http.get(`https://restcountries.com/v3.1/name/${countryValue}`)
        .then(data => {
            console.log(data[0]);
            let name = data[0].name.common;
            let flag = data[0].flags.png;


            // population
            let population = data[0].population;
            // capital
            let capital = data[0].capital;

            // region
            let region = data[0].region;
            // currency
            var currencyObj1 = data[0].currencies;
            var currencyObj2 = currencyObj1[Object.keys(currencyObj1)[0]];
            let currency = currencyObj2.name + ' ' + (`${currencyObj2.symbol}`);

            // language
            let languageObj = data[0].languages;
            let language = languageObj[Object.keys(languageObj)[0]];
            console.log(language);

            // language
            let area = data[0].area;


            // document.getElementById('output').innerHTML = output;
            document.querySelector('.c-name').innerHTML = name;
            document.querySelector('.c-flag').setAttribute('src', flag);
            document.querySelector('.population').innerHTML = population;
            document.querySelector('.capital').innerHTML = capital;
            document.querySelector('.region').innerHTML = region;
            document.querySelector('.currency').innerHTML = currency;
            document.querySelector('.language').innerHTML = language;
            document.querySelector('.size').innerHTML = area;
        })
        .catch(err => console.log(err));

    // e.preventDefault(); 

}


let nameInput = document.querySelector('form input[name="name"]');
let emailInput = document.querySelector('form input[name="email"]');
let passwordInput = document.querySelector('form input[name="password"]');
let confirmPassInput = document.querySelector('form input[name="confirm-pass"]');
let registerBtn = document.querySelector('button[type="submit"]');

nameInput.addEventListener('blur', () => { checkInput(nameInput, 5) })
emailInput.addEventListener('blur', () => { checkInput(emailInput, 5) })
passwordInput.addEventListener('blur', () => { checkInput(passwordInput, 5) })
confirmPassInput.addEventListener('blur', () => { check_pass() })

registerBtn.addEventListener('click', () => alert("invalid password"))


function checkInput(el, num) {
    if (el.value == '' || el.value.length < num) {
        el.classList.add("is-invalid");
        el.classList.remove("is-valid");

    } else {
        el.classList.add("is-valid");
        el.classList.remove("is-invalid");
    }
}

function check_pass() {
    if (passwordInput.value === confirmPassInput.value) {
        registerBtn.addEventListener('click', () => alert("register successfully"))
    } else {
        registerBtn.addEventListener('click', () => alert("something went wrong!"))
    }
}