document.addEventListener("DOMContentLoaded", function () {
  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
});

function showVisitedAnimals() {
  const animals = JSON.parse(localStorage.getItem("animals"));
  const visitedAnimalsSet = new Set(
    JSON.parse(localStorage.getItem("visitedAnimals")) || []
  );
  let visitedAnimalsElement = document.getElementById("visited-animals");
  const title = document.createElement("h2");
  title.textContent = "Visited Animals";
  visitedAnimalsElement.insertAdjacentElement("beforebegin", title);

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
  const animals = JSON.parse(localStorage.getItem("animals"));
  const feededAnimalsSet = new Set(
    JSON.parse(localStorage.getItem("feededAnimals")) || []
  );
  const feededAnimalsElement = document.getElementById("feeded-animals");
  const title = document.createElement("h2");
  title.textContent = "feeded-animals";
  feededAnimalsElement.insertAdjacentElement("beforebegin", title);

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
  const animals = JSON.parse(localStorage.getItem("animals"));
  const visitedAnimals =
    JSON.parse(localStorage.getItem("visitedAnimals")) || [];
  const animalCounts = {};

  // Count the visits for each animal
  visitedAnimals.forEach((animal) => {
    animalCounts[animal] = (animalCounts[animal] || 0) + 1;
  });

  // Find the animal(s) with the maximum visits
  let maxVisits = 0;
  let favoriteAnimal = [];
  for (const animal in animalCounts) {
    if (animalCounts[animal] >= maxVisits) {
      maxVisits = animalCounts[animal];
      favoriteAnimal.push(animal);
    }
  }

  const favoriteAnimalElement = document.getElementById("favorite-animal");
  const title = document.createElement("h2");
  title.textContent = "favorite-animal";
  favoriteAnimalElement.insertAdjacentElement("beforebegin", title);
  favoriteAnimal.forEach((animalName) => {
    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
      favoriteAnimalElement.innerHTML += `<div class="card">
      <img class="card-img-top" src="${selectedAnimal.image}" alt="${selectedAnimal.name}">
      <div class="card-body">
        <h3 class="card-title">${selectedAnimal.name}</h3>`;
    }
  });
}
