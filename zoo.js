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
  const savedByNameFilter = localStorage.getItem("searchByNameFilter") || "";

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
  document.querySelector('input[name="searchAnimal"]').value =
    savedByNameFilter;

  // Apply filters on page load
  applyFilters();

  // Set event listener for applying filters
  document
    .getElementById("applyFilters")
    .addEventListener("click", () => setFilter("some", "some"));
  document.querySelectorAll(".animal").forEach((animalCard) => {
    animalCard.addEventListener("click", () => {
      const animalName = animalCard.querySelector(".card-title").textContent;
      displayAnimalModal(animalName);
    });
  });
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
  const searchAnimal = document.querySelector(
    'input[name="searchAnimal"]'
  ).value; // No need to parse, as it's a string
  localStorage.setItem("predatorFilters", JSON.stringify(predatorFilters));
  localStorage.setItem("habitatFilters", JSON.stringify(habitatFilters));
  localStorage.setItem("minWeightFilter", minWeightFilter);
  localStorage.setItem("minHeightFilter", minHeightFilter);
  localStorage.setItem("colorFilter", colorFilter);
  localStorage.setItem("searchByNameFilter", searchAnimal);
}

function displayAnimals(animals) {
  const animalContainer = document.getElementById("animalContainer");
  const cardHTML = renderAvailableAnimals(animals);
  animalContainer.innerHTML = cardHTML;
}

function renderAvailableAnimals(animals) {
  let cardHTML = "";
  animals.forEach((animal) => {
    cardHTML += `
      <div class="animal">
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

function visitAnimal(animalName) {
  const visitorName = localStorage.getItem("selectedVisitor");
  const selectedAnimal = animals.find((animal) => animal.name === animalName);
  let newAnimalVisit =
    JSON.parse(localStorage.getItem(visitorName + "visitedAnimals")) || [];
  newAnimalVisit.push(animalName);
  localStorage.setItem(
    visitorName + "visitedAnimals",
    JSON.stringify(newAnimalVisit)
  );
  localStorage.setItem("visitedAnimal", JSON.stringify(selectedAnimal));
  window.location.href = "animal.html";
}

function setFilter(filterKey, filterValue) {
  // Set the filter according to the provided key and value
  switch (filterKey) {
    case "isPredator":
    case "habitat":
      // For checkboxes and dropdowns, set the checked or selected value
      const filterInputs = document.querySelectorAll(
        `input[name="${filterKey}"][value="${filterValue}"]`
      );
      filterInputs.forEach((input) => {
        input.checked = true;
      });
      break;
    case "minWeight":
    case "minHeight":
      // For input fields, set the value
      document.querySelector(`input[name="${filterKey}"]`).value = filterValue;
      break;
    case "color":
      // For dropdowns, set the selected value
      document.querySelector('select[name="color"]').value = filterValue;
      break;
    case "searchAnimal":
      // For search inputs, set the value
      document.querySelector('input[name="searchAnimal"]').value = filterValue;
      break;
    default:
      break;
  }

  // Save the selected filters to local storage
  saveFiltersToLocalStorage();

  // Apply filters to display only the animals that meet the filter conditions
  applyFilters();
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
  const searchByNameFilter = document
    .querySelector('input[name="searchAnimal"]')
    .value.trim()
    .toLowerCase();

  const selectedPredatorValues = Array.from(predatorFilters).map(
    (input) => input.value
  );
  const selectedHabitatValues = Array.from(habitatFilters).map(
    (input) => input.value
  );

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

    // Check if searchByNameFilter is empty or undefined, if so, return true to include all animals
    const meetsNameCondition =
      !searchByNameFilter ||
      animal.name.toLowerCase().includes(searchByNameFilter);

    return (
      meetsPredatorCondition &&
      meetsHabitatCondition &&
      meetsColorCondition &&
      meetsWeightCondition &&
      meetsHeightCondition &&
      meetsNameCondition
    );
  });

  displayAnimals(filteredAnimals);
}

function displayAnimalModal(animalName) {
  const selectedAnimal = animals.find((animal) => animal.name === animalName);

  // Construct the modal HTML
  const modalHTML = `
  <div class="modal fade" id="animalModal" tabindex="-1" aria-labelledby="animalModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="animalModalLabel">${
            selectedAnimal.name
          }</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${selectedAnimal.image}" alt="${
    selectedAnimal.name
  }" class="img-fluid mb-3">
          <p><strong>Predator:</strong> ${
            selectedAnimal.isPredator ? "Yes" : "No"
          }</p>
          <p><strong>Weight:</strong> ${selectedAnimal.weight}</p>
          <p><strong>Height:</strong> ${selectedAnimal.height}</p>
          <p><strong>Color:</strong> ${selectedAnimal.color}</p>
          <p><strong>Habitat:</strong> ${selectedAnimal.habitat}</p>
        </div>
      </div>
    </div>
  </div>
`;

  // Remove existing modal if any
  const existingModal = document.getElementById("animalModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Append modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("animalModal"));
  modal.show();
}
