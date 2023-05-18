"use strict";

const countryContainer = document.querySelector(".countries");

/* <img class="country-img" src= "${data.flag}">  */

const renderCountry = function (data) {
  const html = `
  <article class="country">
   <div >
   <p class="flag" > 
   
   ${data.flag}
   </p>  
    <div/>
    <div class="country-data">
        <h3 class="country-name">${data?.name?.common}</h3>
        <h4 class="country-region">${data.region}</h4>
        <p class="country-row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} Million </p>
        <p class="country-row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
        <p class="country-row"><span>💰</span>${Object.keys(
          data.currencies
        )}</p>
        <p class="country-row"><span>🏛</span>${data.capital}</p>
    </div>
    </article>
    `;

  countryContainer.insertAdjacentHTML("beforeend", html);
  countryContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country not found, ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      console.log(data);

      const neighbour = data[0]?.borders[0];

      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then((response) => response.json())
        .then((data) => renderCountry(data[0]))
        .catch((err) => {
          console.log(`${err}!!!!. Something went wrong`);
        });
    });
};

getCountryData("Finland");
