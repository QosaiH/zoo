function createNewVisitor(event) {
  event.preventDefault();
  const nameInput = document.getElementById("VisitorName");
  const ageInput = document.getElementById("age");
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const passwordInput = document.getElementById("Password");
  const name = nameInput.value.trim();
  const age = ageInput.value; // No need to trim for select elements
  const gender = genderInput ? genderInput.value : "";
  const password = passwordInput.value.trim();
  if (!name || !age || !gender || !password) {
    alert("Please fill in all fields with valid information.");
    return;
  }
  // Additional validation if needed...
  const existingVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
  const visitorExists = existingVisitors.some(
    (visitor) => visitor.name === name
  );
  if (visitorExists) {
    alert("Visitor already exists. Choose a different name.");
    return;
  }
  const newVisitor = { name, age, gender, password, coins: 50 };
  existingVisitors.push(newVisitor);
  localStorage.setItem("visitors", JSON.stringify(existingVisitors));
  window.location.href = "login.html"; // Check the path to your login page
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
