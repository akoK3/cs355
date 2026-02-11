'use strict';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

async function getRecipe(){
    const apiKey = document.getElementById('api-key-input').value.trim();
    const ingredients = document.getElementById('ingredients-input').value.trim();

    if (!apiKey || !ingredients) {
        alert('Please enter both an API key and ingredients.');
        return;
    }

    document.getElementById('recipe-display').textContent = 'Cooking up something special... 🍲';

    const prompt = `I have these ingredients: ${ingredients}. 
    Please provide a creative recipe name, a list of instructions, and estimated cooking time. 
    Format the output in clean HTML (using <h2> and <li> tags). 
    Return only the inner HTML content. D
    o not include markdown code blocks, and do not include <html>, <head>, or <body> tags. 
    Start directly with an <h2> tag`;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        })
    });

    const data = await response.json();
    document.getElementById('recipe-display').innerHTML = data.candidates[0].content.parts[0].text;

    if (!response.ok) {
        document.getElementById('recipe-display').textContent = `Error: ${data.error.message}`;
    }
    
}
