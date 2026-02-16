"use strict";

const showBtn = document.getElementById("show-btn");
const imageDiv = document.getElementById("images");
const datalist = document.getElementById("breeds");
const input = document.getElementById("dog-input");

let intervalId = null;
let allBreeds = [];

// Load all breeds into datalist
async function loadBreeds() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();

  const breeds = Object.keys(data.message);
  allBreeds = breeds;

  datalist.innerHTML = "";

  breeds.forEach(function(breed) {
    const option = document.createElement("option");
    option.value = breed;
    datalist.appendChild(option);
  });
}

loadBreeds();

function resolveBreed(raw) {
  const cleaned = raw.trim().toLowerCase();
  if (!cleaned) {
    return "";
  }

  if (allBreeds.includes(cleaned)) {
    return cleaned;
  }

  const squished = cleaned.replace(/[\s-]+/g, "");
  const match = allBreeds.find((breed) => breed.replace(/[\s-]+/g, "") === squished);
  return match || cleaned;
}

async function fetchAndShow(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  imageDiv.textContent = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "success") {
      imageDiv.innerHTML = `<img src="${data.message}" alt="A ${breed} dog">`;
    } else {
      imageDiv.textContent = "No such breed";
      clearInterval(intervalId);
      intervalId = null;
    }
  } catch {
    imageDiv.textContent = "No such breed";
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Show images every 5 seconds when button clicked
showBtn.addEventListener("click", function() {
  const breed = resolveBreed(input.value);

  if (!breed) {
    imageDiv.textContent = "Enter a breed";
    return;
  }

  // Clear previous interval
  if (intervalId) {
    clearInterval(intervalId);
  }

  fetchAndShow(breed);
  intervalId = setInterval(function() {
    fetchAndShow(breed);
  }, 5000);
});
