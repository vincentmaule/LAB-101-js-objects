// ----
// DATA
// ----

// A couple jokes to start with

const defaultJokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

let jokes = {}

const jokesLoadStringed = window.localStorage.getItem('jokes')
jokes = JSON.parse(jokesLoadStringed)
jokes = Object.assign(defaultJokes, jokes)

// The message to display if the jokes object is empty
const noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
const jokesMenuList = document.getElementById('jokes-menu')
const updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  const jokeKeys = Object.keys(jokes)
  const jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
const requestedJokeInput = document.getElementById('requested-joke')
const jokeBox = document.getElementById('joke-box')
const updateDisplayedJoke = function () {
  const requestedJokeKey = requestedJokeInput.value.trim()
  if (jokes[requestedJokeKey] !== undefined) {
    jokeBox.innerHTML = '<p>Setup: ' + jokes[requestedJokeKey].setup + '</p><p>Punchline: ' + jokes[requestedJokeKey].punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found'
  }
}

// Teach me a New Joke
const nJokeTitle = document.getElementById('nJokeTitle')
const nJokeSetup = document.getElementById('nJokeSetup')
const nJokePunch = document.getElementById('nJokePunch')
const nJokeAdd = document.getElementById('nJokeAdd')
const addNewJoke = function () {
  const nJokeTitleparse = nJokeTitle.value.trim()
  const nJokeSetupparse = nJokeSetup.value.trim()
  const nJokePunchparse = nJokePunch.value.trim()

  if (nJokeTitleparse && nJokeSetupparse && nJokePunchparse) {
    jokes[nJokeTitleparse] = {
      setup: nJokeSetupparse,
      punchline: nJokePunchparse
    }
    updatePage()
  } else {
    window.alert('Please make sure the whole joke is filled out')
  }
}

// Removal of new joke
const dJokeTitle = document.getElementById('dJokeTitle')
const dJokeDelete = document.getElementById('dJokeDelete')
const deleteJoke = function () {
  const dJokeTitleParse = dJokeTitle.value.trim()

  if (jokes[dJokeTitleParse] !== undefined) {
    delete jokes[dJokeTitleParse]
    updatePage()
  } else {
    window.alert('Joke does not exist')
  }
}

// Storage of jokes
const jlocalStorage = function () {
  const jokesPushStringed = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', jokesPushStringed)
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
const updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  jlocalStorage()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// LocalStorage Informaion

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
nJokeAdd.addEventListener('click', addNewJoke)
dJokeDelete.addEventListener('click', deleteJoke)
