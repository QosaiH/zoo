function createNewVisitor(event) {
  event.preventDefault();
  const nameInput = document.getElementById("VisitorName");
  const ageInput = document.getElementById("age");
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const passwordInput = document.getElementById("Password");
  const name = nameInput.value.trim();
  const age = ageInput.value;
  const gender = genderInput ? genderInput.value : "";
  const password = passwordInput.value.trim();

  //check if field not filled
  if (!name || !age || !gender || !password) {
    alert("Please fill in all fields with valid information.");
    return;
  }

  // check if visitor exist
  const existingVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
  const visitorExists = existingVisitors.some(
    (visitor) => visitor.name === name
  );
  if (visitorExists) {
    alert("Visitor already exists. Choose a different name.");
    return;
  }

  // create new visitor and go to login page
  const newVisitor = { name, age, gender, password, coins: 50 };
  existingVisitors.push(newVisitor);
  localStorage.setItem("visitors", JSON.stringify(existingVisitors));
  localStorage.setItem("selectedVisitor", name);
  window.location.href = "login.html"; // Check the path to your login page
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
