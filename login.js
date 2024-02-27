document.addEventListener("DOMContentLoaded", function () {
  displayVisitors();
});

function displayVisitors(filteredVisitors) {
  const visitorDisplay = document.getElementById("visitorDisplay");
  const selectedVisitorMessage = document.getElementById(
    "selectedVisitorMessage"
  );

  // Clear previous content
  visitorDisplay.innerHTML = "";
  selectedVisitorMessage.innerHTML = "Select user to login with";

  // Check if a visitor is already selected
  const selectedVisitor = getSelectedVisitor();
  if (selectedVisitor) {
    selectedVisitorMessage.innerHTML = `You are logged in as ${selectedVisitor.name}. <button>Logout</button>`;
  }

  visitorDisplay.innerHTML = createCardHTML(filteredVisitors || visitors);
}

function createCardHTML(visitors) {
  let cardHTML = "";
  visitors.forEach((visitor) => {
    if (visitor.gender == "male") {
      cardHTML += `<div class="card"><img class="card-img-top" src="../photos/man.png" alt="${visitor.name}"><div class="card-body"><h3 class="card-title">${visitor.name}</h3><p class="card-text">Coins: ${visitor.coins}</p><button class="btn btn-primary" onclick="loginAsVisitor('${visitor.name}')">Login</button></div></div>`;
    } else
      cardHTML += `<div class="card"><img class="card-img-top" src="../photos/women.png" alt="${visitor.name}"><div class="card-body"><h3 class="card-title">${visitor.name}</h3><p class="card-text">Coins: ${visitor.coins}</p><button class="btn btn-primary" onclick="loginAsVisitor('${visitor.name}')">Login</button></div></div>`;
  });
  return cardHTML;
}

function loginAsVisitor(visitorName) {
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  if (selectedVisitor === visitorName) {
    // Alert the user that they are already logged in as this visitor
    alert("You are already logged in as this visitor.");
    return; // Exit the function
  }
  if (selectedVisitor) {
    const confirmSwitch = confirm(
      "You are already logged in as another visitor. Do you want to switch?"
    );
    if (!confirmSwitch) {
      return; // If the user cancels, do nothing
    }
  }

  localStorage.setItem("selectedVisitor", visitorName);
  window.location.href = "zoo.html";
}
document
  .getElementById("selectedVisitorMessage")
  .addEventListener("click", () => {
    console.log("Logout function called");
    localStorage.removeItem("selectedVisitor");
    displayVisitors(); // Make sure this function is called properly
  });

function getSelectedVisitor() {
  const selectedVisitorName = localStorage.getItem("selectedVisitor");
  return visitors.find((visitor) => visitor.name === selectedVisitorName);
}

function filterVisitors() {
  const searchInput = document.getElementById("searchVisitor");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchTerm)
  );
  displayVisitors(filteredVisitors);
}
function removeVisitorsWithUndefinedCoins() {
  const existingVisitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Filter out visitors with undefined coins
  const filteredVisitors = existingVisitors.filter(
    (visitor) => typeof visitor.coins !== "undefined"
  );

  // Update local storage with the filtered visitors
  localStorage.setItem("visitors", JSON.stringify(filteredVisitors));
}

// Call the function whenever you want to remove visitors with undefined coins
// For example, you can call it before displaying the visitors on the login page
removeVisitorsWithUndefinedCoins();
