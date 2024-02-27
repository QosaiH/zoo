document.addEventListener("DOMContentLoaded", () => {
  const savedPredatorFilters =
    JSON.parse(localStorage.getItem("predatorFilters")) || [];
  const savedHabitatFilters =
    JSON.parse(localStorage.getItem("habitatFilters")) || [];
  const savedMinWeightFilter =
    parseInt(localStorage.getItem("minWeightFilter")) || 0;
  const savedMinHeightFilter =
    parseInt(localStorage.getItem("minHeightFilter")) || 0;
  const savedColorFilter = localStorage.getItem("colorFilter") || "all";

  // Set predator filter checkboxes
  savedPredatorFilters.forEach((filter) => {
    const predatorCheckbox = document.querySelector(
      `input[name="isPredator"][value="${filter}"]`
    );
    if (predatorCheckbox) {
      predatorCheckbox.checked = true;
    }
  });

  // Set habitat filter checkboxes
  savedHabitatFilters.forEach((filter) => {
    const habitatCheckbox = document.querySelector(
      `input[name="habitat"][value="${filter}"]`
    );
    if (habitatCheckbox) {
      habitatCheckbox.checked = true;
    }
  });

  // Set min weight filter input
  document.querySelector('input[name="minWeight"]').value =
    savedMinWeightFilter;
  // Set min height filter input
  document.querySelector('input[name="minHeight"]').value =
    savedMinHeightFilter;
  // Set color filter select
  document.querySelector('select[name="color"]').value = savedColorFilter;

  // Apply filters on page load
  applyFilters();
});

function saveFiltersToLocalStorage() {
  const predatorFilters = Array.from(
    document.querySelectorAll('input[name="isPredator"]:checked')
  ).map((input) => input.value);
  const habitatFilters = Array.from(
    document.querySelectorAll('input[name="habitat"]:checked')
  ).map((input) => input.value);
  const minWeightFilter = parseInt(
    document.querySelector('input[name="minWeight"]').value
  );
  const minHeightFilter = parseInt(
    document.querySelector('input[name="minHeight"]').value
  );
  const colorFilter = document.querySelector('select[name="color"]').value;

  localStorage.setItem("predatorFilters", JSON.stringify(predatorFilters));
  localStorage.setItem("habitatFilters", JSON.stringify(habitatFilters));
  localStorage.setItem("minWeightFilter", minWeightFilter);
  localStorage.setItem("minHeightFilter", minHeightFilter);
  localStorage.setItem("colorFilter", colorFilter);
}

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
            Weight: ${animal.weight}<br>
            Height: ${animal.height}<br>
            Color: ${animal.color}<br>
            Habitat: ${animal.habitat}<br>
          </p>
          <button onclick="visitAnimal('${animal.name}')">Visit</button>
        </div>
      </div>
    `;
  });
  return cardHTML;
}
document.getElementById("animal").addEventListener("click", visitAnimal);
function visitAnimal(animalName) {
  const selectedAnimal = animals.find((animal) => animal.name === animalName);
  localStorage.setItem("visitedAnimals", JSON.stringify(selectedAnimal));
  window.location.href = "animal.html";
}

function setFilter() {
  const filterInputs = document.querySelectorAll(
    'input[name="isPredator"], input[name="habitat"], select[name="color"], input[name="minWeight"], input[name="minHeight"]'
  );
  filterInputs.forEach((input) => {
    input.addEventListener("change", () => {
      applyFilters();
      saveFiltersToLocalStorage(); // Save filters to local storage on change
    });
  });
}

function applyFilters() {
  const predatorFilters = document.querySelectorAll(
    'input[name="isPredator"]:checked'
  );
  const habitatFilters = document.querySelectorAll(
    'input[name="habitat"]:checked'
  );
  const colorFilter = document.querySelector('select[name="color"]').value;
  const minWeightFilter = parseInt(
    document.querySelector('input[name="minWeight"]').value
  );
  const minHeightFilter = parseInt(
    document.querySelector('input[name="minHeight"]').value
  );

  const selectedPredatorValues = Array.from(predatorFilters).map(
    (input) => input.value
  );
  const selectedHabitatValues = Array.from(habitatFilters).map(
    (input) => input.value
  );

  // Debugging: Log the selected values to see if they match the expected values
  console.log("Selected Predator Values:", selectedPredatorValues);
  console.log("Selected Habitat Values:", selectedHabitatValues);
  console.log("Selected Color Filter:", colorFilter);
  console.log("Selected Min Weight Filter:", minWeightFilter);
  console.log("Selected Min Height Filter:", minHeightFilter);

  const filteredAnimals = animals.filter((animal) => {
    const meetsPredatorCondition =
      selectedPredatorValues.includes(animal.isPredator.toString()) ||
      (selectedPredatorValues.includes("yes") && animal.isPredator) ||
      (selectedPredatorValues.includes("no") && !animal.isPredator) ||
      selectedPredatorValues.includes("nonePredator");
    const meetsHabitatCondition =
      selectedHabitatValues.includes(animal.habitat) ||
      selectedHabitatValues.includes("noneHabitat");
    const meetsColorCondition =
      colorFilter === "all" || animal.color === colorFilter;
    const meetsWeightCondition = isNaN(minWeightFilter)
      ? true
      : animal.weight >= minWeightFilter;
    const meetsHeightCondition = isNaN(minHeightFilter)
      ? true
      : animal.height >= minHeightFilter;

    return (
      meetsPredatorCondition &&
      meetsHabitatCondition &&
      meetsColorCondition &&
      meetsWeightCondition &&
      meetsHeightCondition
    );
  });

  console.log("Filtered Animals:", filteredAnimals); // Debugging: Log the filtered animals array

  displayAnimals(filteredAnimals);
}
