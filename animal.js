document.addEventListener("DOMContentLoaded", () => {
  renderAnimal();
  renderRelatedAnimals();
  const feedAnimalButton = document.getElementById("feed-animal");
  feedAnimalButton.addEventListener("click", feedAnimal);
  const ZooButton = document.getElementById("Zoo");
  ZooButton.addEventListener("click", BackToTheZoo);
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
    if (visitor.coins <= 0 && selectedAnimal.isPredator) {
      visitorGotEaten();
      return;
    }

    if (visitor.coins <= 0 && !selectedAnimal.isPredator) {
      animalEscaped(); // Handle the case where the selected visitor is not found
      return;
    }

    if (visitor.coins >= 2) {
      visitor.coins -= 50; // Deduct 2 coins for feeding
      visitors[visitorIndex] = visitor; // Update the visitor object in the array
      localStorage.setItem("visitors", JSON.stringify(visitors)); // Update visitors in localStorage

      let feededAnimals =
        JSON.parse(localStorage.getItem(visitorName + "feededAnimals")) || [];
      feededAnimals.push(selectedAnimal.name);
      localStorage.setItem(
        visitorName + "feededAnimals",
        JSON.stringify(feededAnimals)
      );

      // Update displayed coins in the dashboard
      document.getElementById(
        "selectedVisitorInfo"
      ).textContent = `Guest: ${visitor.name} - Coins: ${visitor.coins}`;

      // Display the feeding modal
      displayFeedingModal(selectedAnimal.name);
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
  displayVisitorEatenModal();
}
function animalEscaped() {
  const escapedAnimal = JSON.parse(localStorage.getItem("visitedAnimal"));
  const escapedAnimalName = escapedAnimal.name;
  removeAnimal(escapedAnimalName); // Remove the escaped animal from the local animals array
  localStorage.removeItem("visitedAnimal");
}
function removeAnimal(animalName) {
  let animals = JSON.parse(localStorage.getItem("animals")) || [];
  const updatedAnimals = animals.filter((animal) => animal.name !== animalName);
  localStorage.setItem("animals", JSON.stringify(updatedAnimals));
  displayAnimalEscapedModal(); // Display the modal indicating the animal escaped
}
function BackToTheZoo() {
  window.location.href = "zoo.html";
}

function displayFeedingModal(animalName) {
  const selectedAnimal = JSON.parse(localStorage.getItem("visitedAnimal"));

  // Construct the feeding modal HTML
  const modalHTML = `
  <div class="modal fade" id="feedingModal" tabindex="-1" aria-labelledby="feedingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="feedingModalLabel">${selectedAnimal.name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Thank you for feeding the animal.</p>
        </div>
      </div>
    </div>
  </div>
`;

  // Remove existing feeding modal if any
  const existingModal = document.getElementById("feedingModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Append feeding modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show the feeding modal
  const modalElement = document.getElementById("feedingModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Get the close button inside the feeding modal
  const closeButton = modalElement.querySelector(".btn-close");
  // Add event listener to close the feeding modal when the close button is clicked
  closeButton.addEventListener("click", () => {
    modal.hide();
  });
}

function displayAnimalEscapedModal() {
  // Construct the animal escaped modal HTML
  const modalHTML = `
  <div class="modal fade" id="animalEscapedModal" tabindex="-1" aria-labelledby="animalEscapedModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="animalEscapedModalLabel">Animal Escaped</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>The animal has escaped from the zoo!</p>
        </div>
      </div>
    </div>
  </div>
`;

  // Remove existing animal escaped modal if any
  const existingModal = document.getElementById("animalEscapedModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Append animal escaped modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show the animal escaped modal
  const modalElement = document.getElementById("animalEscapedModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Get the close button inside the animal escaped modal
  const closeButton = modalElement.querySelector(".btn-close");
  // Add event listener to close the animal escaped modal when the close button is clicked
  modalElement.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      modal.hide();
      window.location.href = "zoo.html";
    }
  });
}

function displayVisitorEatenModal() {
  // Construct the visitor eaten modal HTML
  const modalHTML = `
  <div class="modal fade" id="visitorEatenModal" tabindex="-1" aria-labelledby="visitorEatenModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="visitorEatenModalLabel">Visitor Eaten</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Oh no! You got eaten by the animal!</p>
        </div>
      </div>
    </div>
  </div>
`;

  // Remove existing visitor eaten modal if any
  const existingModal = document.getElementById("visitorEatenModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Append visitor eaten modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show the visitor eaten modal
  const modalElement = document.getElementById("visitorEatenModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Get the close button inside the visitor eaten modal
  const closeButton = modalElement.querySelector(".btn-close");
  // Add event listener to close the visitor eaten modal when the close button is clicked
  modalElement.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      modal.hide();
      window.location.href = "login.html";
    }
  });
}
