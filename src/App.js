import { useState } from 'react';
import './App.css';
import { generateRecipe } from './api/recipeApi';

function App() {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValidInput = (value) => {
    return /^[A-Za-z0-9\s.,'\-]*$/.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      setErrorMessage('Please enter some text before submitting.');
      setSubmittedText('');
      return;
    }

    if (!isValidInput(trimmedText)) {
      setErrorMessage('Only letters, numbers, spaces, commas, periods, hyphens, and apostrophes are allowed.');
      setSubmittedText('');
      return;
    }

    setErrorMessage('');
    setSubmittedText(trimmedText);

    // Call backend API
    setLoading(true);
    setApiError('');
    setRecipe(null);
    try {
      const data = await generateRecipe(trimmedText);
      setRecipe(data);
    } catch (err) {
      setApiError(err.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (errorMessage) {
      setErrorMessage('');
    }
    setInputText(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Generator</h1>
        <p>Type multiple words below and submit to see your input reflected on the page.</p>

        <form className="input-form" onSubmit={handleSubmit}>
          <label htmlFor="multiword-input">Enter recipe ideas, ingredients, or notes:</label>
          <textarea
            id="multiword-input"
            className="text-input"
            value={inputText}
            onChange={handleChange}
            placeholder="e.g. chicken curry with coconut milk and rice"
            rows={5}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {submittedText && (
          <div className="output-box">
            <h2>Input received</h2>
            <p>{submittedText}</p>
          </div>
        )}
        {loading && <div className="output-box"><p>Loading...</p></div>}
        {apiError && <div className="error-message">{apiError}</div>}
        {recipe && (
          <div className="output-box">
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
            <ol>
              {Array.isArray(recipe.steps) && recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
