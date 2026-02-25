"use strict";

const showBtn = document.getElementById("show-btn");
const imageDiv = document.getElementById("images");
const datalist = document.getElementById("breeds");
const input = document.getElementById("dog-input");

let intervalId = null;
let allBreeds = [];

// Load all breeds into datalist
async function loadBreeds() {
  const response = await fetch("/breeds");

  if (!response.ok) {
    datalist.innerHTML = "";
    return;
  }

  const breeds = await response.json();
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
  const url = `/image/${encodeURIComponent(breed)}`;

  imageDiv.textContent = "Loading...";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Not found");
    }

    const imagePath = await response.text();
    imageDiv.innerHTML = `<img src="${imagePath}" alt="A ${breed} dog">`;
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
