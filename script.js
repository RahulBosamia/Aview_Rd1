// Fetch a random joke from JokeAPI
async function fetchJoke() {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching joke:', error);
    }
  }
  

// Translate a text using Google Translate API
async function translateText(text, targetLanguage) {
    const apiKey = '';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      });
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.log('Error translating text:', error);
    }
  }
  
  
  

  // Display the fetched joke on the page
function displayJoke(joke) {
    const jokeElement = document.getElementById('joke');
    jokeElement.innerHTML = '';
  
    if (joke.type === 'single') {
      jokeElement.innerHTML = `<p>${joke.joke}</p>`;
    } else if (joke.type === 'twopart') {
      jokeElement.innerHTML = `<p>${joke.setup}</p><p>${joke.delivery}</p>`;
    } else {
      jokeElement.innerHTML = '<p>Failed to fetch joke.</p>';
    }
  }
  
  
  
  // Translate the fetched joke to the selected language
async function translateJoke() {
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const jokeElement = document.getElementById('joke');
    const translatedJokeElement = document.getElementById('translatedJoke');
    translatedJokeElement.innerHTML = '';
  
    if (jokeElement.textContent === '') {
      // If no joke is fetched yet, display an error message
      translatedJokeElement.innerHTML = '<p>Please fetch a joke first.</p>';
      return;
    }
  
    const jokeText = jokeElement.textContent;
    const translatedJoke = await translateText(jokeText, selectedLanguage);
  
    if (translatedJoke === undefined) {
      // If translation fails, display an error message
      translatedJokeElement.innerHTML = '<p>Translation failed. Please try again.</p>';
    } else {
      translatedJokeElement.innerHTML = `<p>${translatedJoke}</p>`;
    }
  }
  
  
  // Event listener for the "Translate" button
  document.getElementById('translateBtn').addEventListener('click', translateJoke);
  
  // Fetch a joke and display it on page load
  window.addEventListener('DOMContentLoaded', async () => {
    const joke = await fetchJoke();
    displayJoke(joke);
  });
  
