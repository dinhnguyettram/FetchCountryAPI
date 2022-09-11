console.log("search2 loaded");
let search = document.querySelector('input.search');
let resultsDiv = document.querySelector('.results');
let resultsBtn = document.querySelector('.results-btn');
let countryPoint = document.querySelector('#country');
let countries;
getAllCountries();
async function getAllCountries() {
    search.setAttribute("placeholder", "Loading data, please wait....");
    try {
        let data = await fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json()).then(json => json);
        countries = data.map(country => country.name.common);
        search.removeAttribute("disabled")
        search.setAttribute("placeholder", "Search countries...");
    } catch (e) {
        console.log(e);
        console.log("There was an error");
        search.setAttribute("placeholder", "Sorry data could not be loaded!");
    }
}

document.body.addEventListener("click", function(e) {
    if (e.target.closest(".results") == null) {
        clearSearch();
    }
});

search.addEventListener("keyup", searchCountries);
resultsDiv.addEventListener("click", function(e) {
    if (e.target.classList.contains('list-group-item')) {
        getData(e.target.textContent);
        clearSearch();
    }
});

function searchCountries() {
    let count = 0;
    let results = [];
    countries.forEach(function(country) {
        country = country.toLowerCase();
        if (country.includes(search.value.toLowerCase())) {
            results.push(country);
            count++;
        }
    });
    console.log(count);
    console.log(search.value.length);
    if (search.value.length > 0) {
        console.log('seartching');
        outputSearchResults(results);
        outputCounter(count);
    } else {
        console.log('clearing');
        clearSearch();
    }
}

function outputSearchResults(results) {
    let output = '<ul class="list-group list-group-flush results-list">';
    results.forEach((result) => {
        output += `<li class="list-group-item">${result}</li>`;
    });
    output += '</ul>';
    resultsDiv.innerHTML = output;
    resultsDiv.style.display = "block";
    let resultsUL = document.querySelector('.results-list');
    if (resultsUL.scrollHeight > 350) {
        setTimeout(() => {
            resultsDiv.style.height = "350px";
            resultsDiv.style.overflowY = "scroll";
        }, 10);
    } else {
        resultsDiv.style.overflowY = "hidden";
        setTimeout(() => { resultsDiv.style.height = resultsUL.scrollHeight + "px" }, 10);
    }

}

function outputCounter(count) {
    resultsBtn.style.display = "block"
    if (count > 0) {
        resultsBtn.classList.add("btn-success");
        resultsBtn.classList.remove("btn-danger");
    } else {
        resultsBtn.classList.remove("btn-success");
        resultsBtn.classList.add("btn-danger");
    }
    resultsBtn.firstElementChild.innerText = count;
}

function clearSearch() {
    resultsDiv.style.height = "0px";
    resultsDiv.style.display = "none";
    resultsBtn.style.display = "none";
    resultsBtn.firstElementChild = "0";
    search.value = '';
}