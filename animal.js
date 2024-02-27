document.addEventListener("DOMContentLoaded", () => {
  renderAnimal();
});
function renderAnimal() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimals"));
  console.log(selectedAnimal);

  // Update HTML elements with the specific fields of the selected animal
  const imageDiv = document.getElementById("image");
  if (!imageDiv) {
    console.error("Element with ID 'image' not found.");
    return;
  }

  imageDiv.innerHTML = ""; // Clear previous content

  // Create and append the image element
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
  const relatedAnimalsElement = document.getElementById("related-animals");

  // Clear previous content
  relatedAnimalsElement.innerHTML = "";

  // Assume related animals are stored in an array named 'relatedAnimals'
  relatedAnimals.forEach((animal) => {
    if (animal.habitat === selectedAnimal.habitat) {
      const animalCard = document.createElement("div");
      animalCard.classList.add("animal-card");
      animalCard.textContent = animal.name;
      relatedAnimalsElement.appendChild(animalCard);
    }
  });
}

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
