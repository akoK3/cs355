"use strict";

const express = require("express");
const app = express();
const PORT = 3000;

// serve static files from public/
app.use(express.static("public"));

// dog image data (breed → array of image file names)
const dogImages = {
  labrador: ["labrador1.jpg", "labrador2.jpg"],
  poodle: ["poodle1.jpg", "poodle2.jpg"],
  bulldog: ["bulldog1.jpg", "bulldog2.jpg"]
};

// GET /breeds → return list of breeds
app.get("/breeds", (req, res) => {
  res.json(Object.keys(dogImages));
});

// helper function to get random item from array
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// GET /image/:breed → return random image path
app.get("/image/:breed", (req, res) => {
  const breed = req.params.breed.toLowerCase();

  if (!dogImages[breed]) {
    return res.status(404).send("Breed not found");
  }

  const randomImage = getRandomItem(dogImages[breed]);

  res.send(`/img/${randomImage}`);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});