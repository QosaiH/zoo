document.addEventListener("DOMContentLoaded", function () {
  displayAnimals(animals);
});

function displayAnimals(animals) {
  const animalContainer = document.getElementById("animalContainer");
  const cardHTML = renderAvailableAnimals(animals);
  animalContainer.innerHTML = cardHTML;
  setFilter();
}
function renderAvailableAnimals(animals) {
  let cardHTML = "";
  animals.forEach((animal) => {
    cardHTML += `
      <div id="animal" class="card">
        <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
        <div class="card-body">
          <h3 class="card-title">${animal.name}</h3>
          <p class="card-text">
          Predator: ${animal.isPredator ? "Yes" : "No"}<br>
            Type: ${animal.type}<br>
            Weight: ${animal.weight}<br>
            height${animal.height}<br>
            Color: ${animal.color}<br>
            habitat: ${animal.habitat}<br>
          </p>
          <button onclick="visitAnimal('${animal.name}')">visit</button>
        </div>
      </div>
    `;
  });
  return cardHTML;
}

function visitAnimal(animalName) {
  const selectedAnimal = animals.find((animal) => animal.name === animalName);
  displayAnimals(selectedAnimal);
}
/*
function setFilter() {
  document.getElementById("yes").addEventListener("click", isPredator);
  document.getElementById("no").addEventListener("click", notPredator);
  document.getElementById("none").addEventListener("click", displayAnimals);
  document.getElementById("land").addEventListener("click", land);
  document.getElementById("sea").addEventListener("click", sea);
  document.getElementById("noneh").addEventListener("click", displayAnimals);
}
function isPredator() {
  const animalContainer = document.getElementById("animalContainer");
  animalContainer.innerHTML = ""; // Clear previous content
  animals.forEach((animal) => {
    if (animal.isPredator) {
      animalContainer.innerHTML += `
        <div id="animal" class="card">
          <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
          <div class="card-body">
            <h3 class="card-title">${animal.name}</h3>
            <p class="card-text">
            Predator: ${animal.isPredator ? "Yes" : "No"}<br>
              Type: ${animal.type}<br>
              Weight: ${animal.weight}<br>
              height${animal.height}<br>
              Color: ${animal.color}<br>
              habitat: ${animal.habitat}<br>
            </p>
            <button onclick="visitAnimal('${animal.name}')">visit</button>
          </div>
        </div>
      `;
    }
  });
}
function notPredator() {
  const animalContainer = document.getElementById("animalContainer");
  animalContainer.innerHTML = ""; // Clear previous content
  animals.forEach((animal) => {
    if (animal.isPredator === false) {
      animalContainer.innerHTML += `
        <div id="animal" class="card">
          <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
          <div class="card-body">
            <h3 class="card-title">${animal.name}</h3>
            <p class="card-text">
            Predator: ${animal.isPredator ? "Yes" : "No"}<br>
              Type: ${animal.type}<br>
              Weight: ${animal.weight}<br>
              height${animal.height}<br>
              Color: ${animal.color}<br>
              habitat: ${animal.habitat}<br>
            </p>
            <button onclick="visitAnimal('${animal.name}')">visit</button>
          </div>
        </div>
      `;
    }
  });
}
function land() {
  const animalContainer = document.getElementById("animalContainer");
  animalContainer.innerHTML = ""; // Clear previous content
  animals.forEach((animal) => {
    if (animal.habitat === "land") {
      animalContainer.innerHTML += `
        <div id="animal" class="card">
          <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
          <div class="card-body">
            <h3 class="card-title">${animal.name}</h3>
            <p class="card-text">
            Predator: ${animal.isPredator ? "Yes" : "No"}<br>
              Type: ${animal.type}<br>
              Weight: ${animal.weight}<br>
              height${animal.height}<br>
              Color: ${animal.color}<br>
              habitat: ${animal.habitat}<br>
            </p>
            <button onclick="visitAnimal('${animal.name}')">visit</button>
          </div>
        </div>
      `;
    }
  });
}
function sea() {
  const animalContainer = document.getElementById("animalContainer");
  animalContainer.innerHTML = ""; // Clear previous content
  animals.forEach((animal) => {
    if (animal.habitat === "sea") {
      animalContainer.innerHTML += `
        <div id="animal" class="card">
          <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
          <div class="card-body">
            <h3 class="card-title">${animal.name}</h3>
            <p class="card-text">
            Predator: ${animal.isPredator ? "Yes" : "No"}<br>
              Type: ${animal.type}<br>
              Weight: ${animal.weight}<br>
              height${animal.height}<br>
              Color: ${animal.color}<br>
              habitat: ${animal.habitat}<br>
            </p>
            <button onclick="visitAnimal('${animal.name}')">visit</button>
          </div>
        </div>
      `;
    }
  });
}
*/
function applyFilters() {
  const predatorFilter = document.querySelector(
    'input[name="isPredator"]:checked'
  ).value;
  const habitatFilter = document.querySelector(
    'input[name="habitat"]:checked'
  ).value;

  // Filter animals based on the selected options
  const filteredAnimals = animals.filter((animal) => {
    if (predatorFilter === "yes" && habitatFilter === "land") {
      return animal.isPredator && animal.habitat === "land";
    } else if (predatorFilter === "yes" && habitatFilter === "sea") {
      return animal.isPredator && animal.habitat === "sea";
    } else if (predatorFilter === "no" && habitatFilter === "land") {
      return !animal.isPredator && animal.habitat === "land";
    } else if (predatorFilter === "no" && habitatFilter === "sea") {
      return !animal.isPredator && animal.habitat === "sea";
    } else if (predatorFilter === "yes" && habitatFilter === "noneh") {
      return animal.isPredator;
    } else if (predatorFilter === "no" && habitatFilter === "noneh") {
      return !animal.isPredator;
    } else if (predatorFilter === "none" && habitatFilter === "land") {
      return animal.habitat === "land";
    } else if (predatorFilter === "none" && habitatFilter === "sea") {
      return animal.habitat === "sea";
    } else {
      return true; // Show all animals if no filters are selected
    }
  });

  displayAnimals(filteredAnimals);
}

function setFilter() {
  const filterInputs = document.querySelectorAll(
    'input[name="isPredator"], input[name="habitat"]'
  );
  filterInputs.forEach((input) => {
    input.addEventListener("change", applyFilters);
  });
}
