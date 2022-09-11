console.log("search loaded");
let resultsBtn = document.querySelector('.results-btn');
let countryNames;
let resultsDiv = document.querySelector('.results');
let search = document.querySelector('input.search');
let countryDiv = document.querySelector('#country');
document.addEventListener("DOMContentLoaded", function() {
    countryNames = countries.map(country => country.name.common);
    console.log(countryNames);
})

document.body.addEventListener("click", function(e) {
    if (e.target.closest(".results") == null) {
        hideResults();
    }
})

resultsDiv.addEventListener("click", function(e) {
    console.log(e.target);
    if (e.target.classList.contains('search-result')) {
        console.log(e.target.textContent);
        search.value = '';
        resultsDiv.style.display = "none";
        resultsBtn.style.display = "none";
        countryDiv.scrollIntoView();
        getData(e.target.textContent);
    }
})
search.addEventListener("keyup", function(e) {
    console.log(search.value);
    let count = 0;
    let results = [];
    countryNames.forEach(country => {
        country = country.toLocaleLowerCase();
        if (country.includes(search.value.toLowerCase())) {
            count++;
            results.push(country)
        }
    });
    console.log("Total matches: " + count);
    console.log(results);
    if (count != 0 || search.value.length != 0) {
        outputResults(results, count);
        updateResultsBtn(count)
    } else {
        hideResults();
    }
})

function hideResults() {
    resultsDiv.style.display = "none";
    resultsBtn.style.display = "none";
    search.value = '';
}

function updateResultsBtn(count) {
    resultsBtn.style.display = "block";
    if (count > 0) {
        resultsBtn.classList.add('btn-success');
        resultsBtn.classList.remove('btn-danger');
        resultsBtn.firstElementChild.textContent = count;
    } else {
        resultsBtn.classList.add('btn-danger');
        resultsBtn.firstElementChild.textContent = 0;
    }

}

function outputResults(results) {
    let offset = search.scrollHeight;
    let output = '<ul class="list-group list-group-flush">';
    results.forEach(item => {
        output += `
    <li class="list-group-item search-result">${item}</li>`
    })
    output += '</ul>';
    resultsDiv.innerHTML = output;
    let resultUL = document.querySelector('.results ul');
    resultsDiv.style = `display: block; height:350px`;
    if (resultUL.scrollHeight > 350) {
        resultsDiv.style.height = '350px';
        resultsDiv.style.overflowY = "scroll";
    } else {
        resultsDiv.style.height = resultUL.scrollHeight + "px";
    }
}