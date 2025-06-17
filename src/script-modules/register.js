import { showSuccess,showAlert,showError,injectModal } from "../components/modals.js";
import {registerUser, fetchAllData} from "../services/databasemanagement.js";

document.body.insertAdjacentHTML("beforeend",injectModal());

const email = document.getElementById("new-email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const registerForm = document.getElementById("registration-form");


registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const emailVal = email.value.trim();
  const passwordVal = password.value;
  const confirmPasswordVal = confirmPassword.value;
  const userType = document.querySelector('input[name="user_type"]:checked');

  if (!emailVal || !passwordVal || !confirmPasswordVal || !userType) {
    return showError("Invalid Input!", "Please fill in all fields.");
  }

  if (!emailVal.includes("@")) {
    
    return showError("Invalid Email!", "Please enter a valid email address.");
  }

  if (passwordVal.length < 6) {
    return showError("Invalid Password!", "Password must be at least 6 characters long.");
  }

  if (passwordVal !== confirmPasswordVal) {
    return showError("Error", "Passwords do not match!");
  }

  if (!userType) {
    return showError("Invalid Input!", "Please select a user type.");
  }

  try {
    const users = await fetchAllData("users");
    const exists = users.some(user => user.email === emailVal && user.role === userType.value);

    if (exists) {
      return showAlert("User Already Exists", "Email already registered. Please use a different email.");
    }

    const result = await registerUser(emailVal, passwordVal, userType.value);
    if (result) {
      
      showSuccess("Success!", "Registration successful!\nNow You can login");

    } else {
      showError("Error", "Registration failed. Please try again.");
    }
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
  } catch (error) {
    console.error("Error during registration:", error);
    showError("Error", "An error occurred while registering. Please try again later.");
  }
});
