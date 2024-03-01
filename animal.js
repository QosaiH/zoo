document.addEventListener("DOMContentLoaded", () => {
  renderAnimal();
  renderRelatedAnimals();
  const feedAnimalButton = document.getElementById("feed-animal");
  feedAnimalButton.addEventListener("click", feedAnimal);
});

function renderAnimal() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimal"));

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
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimal"));
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
      <div class="card">
        <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
        <div class="card-body">
          <h3 class="card-title">${animal.name}</h3>
        </div>
        </div>
      `;
    }
  });
}

function feedAnimal() {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimal"));
  const visitorName = localStorage.getItem("selectedVisitor");
  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  const visitorIndex = visitors.findIndex(
    (visitor) => visitor.name === visitorName
  );

  if (visitorIndex !== -1) {
    let visitor = visitors[visitorIndex];
    visitor.coins -= 2; // Deduct 2 coins for feeding
    visitors[visitorIndex] = visitor; // Update the visitor object in the array
    localStorage.setItem("visitors", JSON.stringify(visitors)); // Update visitors in localStorage
    if (visitor.coins >= 0) {
      let feededAnimals =
        JSON.parse(localStorage.getItem("feededAnimals")) || [];
      feededAnimals.push(selectedAnimal.name);
      localStorage.setItem("feededAnimals", JSON.stringify(feededAnimals));
      alert(`Feeding ${selectedAnimal.name}...`);
    }
    if (visitor.coins < 0 && selectedAnimal.isPredator) {
      visitorGotEaten();
      return;
    }

    if (visitor.coins < 0 && selectedAnimal.isPredator == false) {
      animalEscaped(); // Handle the case where the selected visitor is not found
    }
  }
}

function visitorGotEaten() {
  const visitorName = localStorage.getItem("selectedVisitor");
  removeVisitor(visitorName); // Remove the eaten visitor from the local visitors array
  localStorage.removeItem("selectedVisitor"); // Remove the selected visitor from local storage
}
function removeVisitor(visitorName) {
  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  visitors = visitors.filter((visitor) => visitor.name !== visitorName);
  localStorage.setItem("visitors", JSON.stringify(visitors));
  alert("Oh no! You got eaten by the animal!");
  window.location.href = "login.html";
}
function animalEscaped() {
  const escapedAnimalName = JSON.parse(localStorage.getItem("visitedAnimal"));
  removeAnimal(escapedAnimalName); // Remove the escaped animal from the local animals array
}
function removeAnimal(animalName) {
  let animals = JSON.parse(localStorage.getItem("animals")) || [];
  animals = animals.filter((animal) => animal.name !== animalName);
  localStorage.setItem("animals", JSON.stringify(animals));
  alert("The animal has escaped from the zoo!");
  window.location.href = "zoo.html";
}
// Your JavaScript code here
