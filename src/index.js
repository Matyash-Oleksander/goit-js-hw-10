import './css/styles.css';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

// var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// let input = document.getElementById('#search-box');
// searchForm.addEventListener('input', onSearch);

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// searchForm.addEventListener(
//   'input',
//   _.debounce(() => {
//     onSearch;
//   }, DEBOUNCE_DELAY)
// );

function onSearch(evt) {
  evt.preventDefault();
  // console.log('START 1');

  let name = searchForm.value.trim();
  console.log(name);

  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }
  fetchCountries(name)
    .then(response => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      // console.log(response);

      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        // console.log(
        //   'Too many matches found. Please enter a more specific name.'
        // );
        // console.log('START 2', response);
      } else if (response.length <= 10 && response.length >= 2) {
        countryList.insertAdjacentHTML(
          'beforeend',
          renderCountryList(response)
        );
      } else {
        countryInfo.insertAdjacentHTML(
          'beforeend',
          renderCountryInfo(response)
        );
        // console.log('START 3', response);
      }
    })
    .catch(() => {
      // console.log('Oops, there is no country with that name');
      Notiflix.Notify.failure('Oops, there is no country with that name');
      // myFunction();
      // document.getElementById('search-box').reset();
      return [];
    });
}

// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//     // `https://restcountries.com/v3.1/name/peru?fields=name,capital,population,flags,languages`
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(console.log);
// }

// Функції рендерить інформацію для користувача

function renderCountryList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 50px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
    })
    .join('');
}

function renderCountryInfo(countries) {
  return countries
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <img width="50px" height="50px" src='${flags.svg}'
      alt='${name.official} flag' />
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Name: </b>${
              name.official
            }</p></li>
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(
              languages
            )}</p></li>
        </ul>
        `;
    })
    .join('');
}

// очищення форми в разі catch

function myFunction() {
  //alert("ok");

  console.log('ВИЗВАНА ФУНКЦІЯ!!!!!!!!!!!!!!!!!!!');
  // countryList.innerHTML = '';
  // document.getElementById('#search-box').reset();
  // searchForm.value = '';
  // HTMLFormElement.reset();
  // var elem = document.getElementById('#search-box');
  // // elem = '';
  // const input = document.getElementById('#search-box');
  // input.addEventListener('reset');
  // document.getElementById('#search-box').value = '';

  // const firstNameInput = document.getElementById('#search-box');

  // return (firstNameInput.value = '');

  // input.reset();
}
