import { take, put, call, takeEvery, spawn } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
          secs -= 1
          if (secs > 0) {
            emitter(secs)
          } else {
            // this causes the channel to close
            emitter(END)
          }
        }, 1000);
        // The subscriber must return an unsubscribe function
        return () => {
          clearInterval(iv)
        }
      }
    )
  }

// Countdown channel
function* countDownSaga() {
  const chan = yield call(countdown, 15)
  try {    
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      // let seconds = yield take(chan)
      // console.log(`countdown: ${seconds}`)
      yield take(chan);
    }
  } finally {
    // console.log('countdown terminated');
    // Restart Counter
    yield spawn(countDownSaga)
    // Fetch next letter
    yield spawn(fetchCountries)
  }
}


// Api GET Call
function getCountriesApi(apiUrl) {
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'applicationn/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .catch((error) => {
            throw error
        })
}

// Change to next letter every 15 seconds
// Alphabetical Order, start:A(0) end:Z(25)
var currentLetter = 0
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
function alphabeticalOrder(currentLetter) {
    if (currentLetter <= 25) {
        currentLetter++
    } else {
        currentLetter = 0;
    }
    return currentLetter;
}

// Create filtered countries list
const filteredCountries = [
    {
        'name': ''
    }];
function validateCountries(countries) {
    for (let i = 0; i < countries.length; i++) {
        // Check if item start with the current letter in the alphabetical order (a-z)
        if (countries[i].name.toLowerCase().startsWith(alphabet[currentLetter])) {
            // Check if the data already exist in the state
            if (!filteredCountries.some(country => country.name === countries[i].name)) {
                filteredCountries.push({ 'name': countries[i].name });
            }
        } else {
            alphabeticalOrder(currentLetter)
        }
    }
    alphabeticalOrder(currentLetter++);
    return filteredCountries;
}


function* fetchCountries() {
    try {
        // GET Countries names list
        const apiUrl = 'https://restcountries.com/v2/all?fields=name';
        const countries = yield call(getCountriesApi, apiUrl);
        // Validate Countries list
        const filteredCountries = validateCountries(countries).slice(1);
        // Success
        yield put({ type: 'GET_COUNTRIES_SUCCESS', countries: filteredCountries });
    } catch (e) {
        // Errorr
        yield put({ type: 'GET_COUNTRIES_FAILED', message: e.message });
    }
}


function* countriesSaga() {
    yield takeEvery('GET_COUNTRIES_REQUESTED', countDownSaga);
}


export default countriesSaga;