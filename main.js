let visitors = [
  {
    name: "John Smith",
    coins: 50,
    gender: "male",
  },
  {
    name: "Emily Johnson",
    coins: 50,
    gender: "female",
  },
  {
    name: "Michael Williams",
    coins: 50,
    gender: "male",
  },
  {
    name: "Jessica Brown",
    coins: 50,
    gender: "female",
  },
  {
    name: "Christopher Jones",
    coins: 50,
    gender: "male",
  },
  {
    name: "Ashley Davis",
    coins: 50,
    gender: "female",
  },
  {
    name: "Matthew Miller",
    coins: 50,
    gender: "male",
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    gender: "female",
  },
  {
    name: "David Moore",
    coins: 50,
    gender: "male",
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    gender: "female",
  },
  {
    name: "James Anderson",
    coins: 50,
    gender: "male",
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    gender: "female",
  },
  {
    name: "Robert Jackson",
    coins: 50,
    gender: "male",
  },
  {
    name: "Elizabeth White",
    coins: 50,
    gender: "female",
  },
  {
    name: "Daniel Harris",
    coins: 50,
    gender: "male",
  },
  {
    name: "Melissa Martin",
    coins: 50,
    gender: "female",
  },
  {
    name: "William Thompson",
    coins: 50,
    gender: "male",
  },
  {
    name: "Linda Garcia",
    coins: 50,
    gender: "female",
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    gender: "male",
  },
  {
    name: "Karen Robinson",
    coins: 50,
    gender: "female",
  },
];
let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/1598377/pexels-photo-1598377.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/2649841/pexels-photo-2649841.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/1319515/pexels-photo-1319515.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/750539/pexels-photo-750539.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/47074/squirrel-monkey-monkey-climb-feeding-47074.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/5840732/pexels-photo-5840732.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    image:
      "https://images.pexels.com/photos/724695/pexels-photo-724695.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image:
      "https://images.pexels.com/photos/1320427/pexels-photo-1320427.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

//********************** */
function logout() {
  localStorage.removeItem("selectedVisitor");
  window.location.href = "login.html"; // Make sure this function is called properly
}
// Function to handle visitor change from the dropdown
function showSelectedVisitor() {
  const selectedVisitorName = localStorage.getItem("selectedVisitor") || "";
  const selectedVisitor = visitors.find(
    (visitor) => visitor.name === selectedVisitorName
  );

  if (selectedVisitor) {
    const visitorCoins = selectedVisitor.coins;
    const selectedVisitorInfo = document.getElementById("selectedVisitorInfo");
    selectedVisitorInfo.textContent = `Guest: ${selectedVisitorName} - Coins: ${visitorCoins}`;

    // Save the selected visitor's name to local storage under the key "selectedVisitor"
    localStorage.setItem("selectedVisitor", selectedVisitorName);
  }
}

// Function to reset local storage
function resetLocalStorage() {
  localStorage.clear();
  location.reload(); // Reload the page after clearing local storage
}
function openDashboard() {
  window.location.href = "dashboard.html";
}
// Populating the dropdown menu with visitors
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("visitorDropdown");
  if (dropdown) {
    showSelectedVisitor();
    visitors.forEach((visitor) => {
      const option = document.createElement("option");
      option.value = visitor.name;
      option.textContent = visitor.name;
      dropdown.appendChild(option);
    });
  }
});
