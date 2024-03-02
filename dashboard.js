document.addEventListener("DOMContentLoaded", function () {
  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
});

function showVisitedAnimals() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const visitedAnimalsSet = new Set(
    JSON.parse(localStorage.getItem(visitorName + "visitedAnimals")) || []
  );
  let visitedAnimalsElement = document.getElementById("visited-animals");
  const title = document.createElement("h2");
  title.textContent = "Visited Animals";
  visitedAnimalsElement.insertAdjacentElement("beforebegin", title);
  if (visitedAnimalsSet.size === 0) {
    visitedAnimalsElement.innerHTML = `<p>No animals visited yet.</p>`;
  }
  visitedAnimalsSet.forEach((animalName) => {
    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
      visitedAnimalsElement.innerHTML += `<div class="card">
      <img class="card-img-top" src="${selectedAnimal.image}" alt="${selectedAnimal.name}">
      <div class="card-body">
        <h3 class="card-title">${selectedAnimal.name}</h3>`;
    }
  });
}

function showFeededAnimals() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const feededAnimalsSet = new Set(
    JSON.parse(localStorage.getItem(visitorName + "feededAnimals")) || []
  );
  const feededAnimalsElement = document.getElementById("feeded-animals");
  const title = document.createElement("h2");
  title.textContent = "feeded-animals";
  feededAnimalsElement.insertAdjacentElement("beforebegin", title);
  if (feededAnimalsSet.size === 0) {
    feededAnimalsElement.innerHTML = `<p>No animals feeded yet.</p>`;
  }
  feededAnimalsSet.forEach((animalName) => {
    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
      feededAnimalsElement.innerHTML += `<div class="card">
      <img class="card-img-top" src="${selectedAnimal.image}" alt="${selectedAnimal.name}">
      <div class="card-body">
        <h3 class="card-title">${selectedAnimal.name}</h3>`;
    }
  });
}

function showFavoriteAnimal() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const visitedAnimals =
    JSON.parse(localStorage.getItem(visitorName + "visitedAnimals")) || [];
  const animalCounts = {};

  // Count the visits for each animal
  visitedAnimals.forEach((animal) => {
    animalCounts[animal] = (animalCounts[animal] || 0) + 1;
  });

  // Find the animal(s) with the maximum visits
  let maxVisits = 0;
  let favoriteAnimal = [];
  for (const animal in animalCounts) {
    if (animalCounts[animal] > maxVisits) {
      maxVisits = animalCounts[animal];
      favoriteAnimal = [animal]; // Reset the array with the new favorite animal
    } else if (animalCounts[animal] === maxVisits) {
      favoriteAnimal.push(animal); // Add additional favorite animals if they have the same visit count
    }
  }

  const favoriteAnimalElement = document.getElementById("favorite-animal");
  favoriteAnimalElement.innerHTML = ""; // Clear previous content
  const title = document.createElement("h2");
  title.textContent = "Favorite Animal(s)";
  favoriteAnimalElement.insertAdjacentElement("beforebegin", title);
  if (visitedAnimals.length === 0) {
    favoriteAnimalElement.innerHTML = `<p>No animals have been visited yet.</p>`;
  }
  favoriteAnimal.forEach((animalName) => {
    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
      favoriteAnimalElement.innerHTML += `
        <div class="card">
          <img class="card-img-top" src="${selectedAnimal.image}" alt="${selectedAnimal.name}">
          <div class="card-body">
            <h3 class="card-title">${selectedAnimal.name}</h3>
          </div>
        </div>`;
    }
  });
}
