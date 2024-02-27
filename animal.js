document.addEventListener("DOMContentLoaded", () => {
  renderAnimal();
  renderRelatedAnimals();
});
function renderAnimal() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimals"));

  // Update HTML elements with the specific fields of the selected animal
  const imageDiv = document.getElementById("image");
  const imageElement = document.createElement("img");
  imageElement.src = selectedAnimal.image;
  imageElement.alt = selectedAnimal.name;
  imageDiv.appendChild(imageElement);

  document.getElementById("name").textContent = selectedAnimal.name;
  document.getElementById(
    "weight"
  ).textContent = `Weight: ${selectedAnimal.weight}`;
  document.getElementById(
    "height"
  ).textContent = `Height: ${selectedAnimal.height}`;
  document.getElementById(
    "color"
  ).textContent = `Color: ${selectedAnimal.color}`;
  document.getElementById(
    "habitat"
  ).textContent = `Habitat: ${selectedAnimal.habitat}`;
  document.getElementById("isPredator").textContent = `Predator: ${
    selectedAnimal.isPredator ? "Yes" : "No"
  }`;
}

function renderRelatedAnimals() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimals"));
  let relatedAnimalsElement = document.getElementById("related-animals");
  const animals = JSON.parse(localStorage.getItem("animals"));

  // Clear previous content
  relatedAnimalsElement.innerHTML = "";

  // Iterate through the animals to find related ones
  animals.forEach((animal) => {
    if (
      animal.habitat === selectedAnimal.habitat &&
      animal.name !== selectedAnimal.name
    ) {
      relatedAnimalsElement.innerHTML += `
      <div>
        <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
        <div class="card-body">
          <h3 class="card-title">${animal.name}</h3>
          <p class="card-text">
            Predator: ${animal.isPredator ? "Yes" : "No"}<br>
            Weight: ${animal.weight}<br>
            Height: ${animal.height}<br>
            Color: ${animal.color}<br>
            Habitat: ${animal.habitat}<br>
          </p>
        </div>
        </div>
      `;
    }
  });
}
/*
function feedAnimal() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimals"));
  let coins = parseInt(localStorage.getItem("coins"));

  if (coins >= 5) {
    alert(`Feeding ${selectedAnimal.name}...`);
    coins -= 5; // Deduct 5 coins for feeding
    localStorage.setItem("coins", coins); // Update the number of coins in localStorage
  } else {
    alert("Not enough coins to feed the animal!");
  }
}

function visitorGotEaten() {
  alert("Oh no! You got eaten by the animal!");
}

function animalEscaped() {
  alert("The animal has escaped from the zoo!");
}
// Your JavaScript code here
*/
