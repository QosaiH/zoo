document.addEventListener("DOMContentLoaded", function () {
  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
});

function showVisitedAnimals() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const visitedAnimals =
    JSON.parse(localStorage.getItem(visitorName + "visitedAnimals")) || [];
  const visitedAnimalsElement = document.getElementById("visited-animals");

  visitedAnimalsElement.innerHTML = "<h2>Visited Animals</h2>";
  visitedAnimals.forEach((animal) => {
    visitedAnimalsElement.innerHTML += `<div class="animal">
    <img class="card-img-top" src="${animal.image}" alt="${animal.name}">
    <div class="card-body">
      <h3 class="card-title">${animal.name}</h3>`;
  });
}

function showFeededAnimals() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const feededAnimals =
    JSON.parse(localStorage.getItem(visitorName + "_feededAnimals")) || [];
  const feededAnimalsElement = document.getElementById("feeded-animals");

  feededAnimalsElement.innerHTML = "<h2>Feeded Animals</h2>";
  feededAnimals.forEach((animal) => {
    feededAnimalsElement.innerHTML += `<p>${animal}</p>`;
  });
}

function showFavoriteAnimal() {
  const visitorName = localStorage.getItem("selectedVisitor");
  const visitedAnimals =
    JSON.parse(localStorage.getItem(visitorName + "_visitedAnimals")) || [];
  let animalCounts = {};

  // Count the visits for each animal
  visitedAnimals.forEach((animal) => {
    animalCounts[animal] = (animalCounts[animal] || 0) + 1;
  });

  // Find the animal with the maximum visits
  let maxVisits = 0;
  let favoriteAnimal = null;
  for (const animal in animalCounts) {
    if (animalCounts[animal] > maxVisits) {
      maxVisits = animalCounts[animal];
      favoriteAnimal = animal;
    }
  }

  const favoriteAnimalElement = document.getElementById("favorite-animal");
  favoriteAnimalElement.innerHTML = `<h2>Favorite Animal</h2><p>${favoriteAnimal}</p>`;
}
