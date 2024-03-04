document.addEventListener("DOMContentLoaded", function () {
  filterVisitors();
});

const searchVisitor = document.getElementById("searchVisitor");
searchVisitor.addEventListener("input", filterVisitors);

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
    selectedVisitorMessage.innerHTML = `
          You are logged in as <strong>${selectedVisitor.name}</strong>.
          <button id="logoutButton" class="btn btn-danger">Logout</button>
          <button id="goToZooButton" class="btn btn-primary" onclick="startthegame('${selectedVisitor.name}')">Go To the Zoo</button>
      `;
    // Add event listener to logoutButton
    document.getElementById("logoutButton").addEventListener("click", () => {
      localStorage.removeItem("selectedVisitor");
      displayVisitors();
    });
  }

  visitorDisplay.innerHTML = createCardHTML(filteredVisitors || visitors);
}

function createCardHTML(visitors) {
  let cardHTML = "";
  visitors.forEach((visitor) => {
    if (visitor.gender == "male") {
      cardHTML += `<div class="card"><img class="card-img-top" src="https://www.flaticon.com/download/icon/4140048?icon_id=4140048&author=250&team=250&keyword=Man&pack=4139947&style=1&style_id=133&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard&search=man" alt="${visitor.name}" /><div class="card-body"><h3 class="card-title">${visitor.name}</h3><p class="card-text">Coins: ${visitor.coins}</p><button class="btn btn-primary" onclick="loginAsVisitor('${visitor.name}')">Login</button></div></div>`;
    } else {
      cardHTML += `<div class="card"><img class="card-img-top" src="https://www.flaticon.com/download/icon/6997662?icon_id=6997662&author=670&team=670&keyword=Woman&pack=6997480&style=Circular&style_id=1216&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard&search=women" alt="${visitor.name}" /><div class="card-body"><h3 class="card-title">${visitor.name}</h3><p class="card-text">Coins: ${visitor.coins}</p><button class="btn btn-primary" onclick="loginAsVisitor('${visitor.name}')">Login</button></div></div>`;
    }
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

function startthegame(visitorName) {
  localStorage.setItem("selectedVisitor", visitorName);
  window.location.href = "zoo.html";
}
