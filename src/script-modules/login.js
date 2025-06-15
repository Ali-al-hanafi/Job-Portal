 
 import {showAlert, showError, showSuccess} from "../components/modals.js";
 import { validateCredentials } from "../services/databasemanagement.js";

let btnLogin = document.getElementById("loginBtn");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

function navigateToPage(userType) {
  if (userType === "employer") {
    window.location.href = "./src/application/employer.html?email=" + emailInput.value;
  } else if (userType === "jobseeker") {
    window.location.href = "./src/application/jobseeker.html?email=" + emailInput.value;
  } else {
    showError("Invalid User Type", "You must select a user type to log in.");
  }
}

btnLogin.addEventListener("click", function (event) {
  event.preventDefault(); 
  let selected = document.querySelector('input[name="user_type"]:checked');

  if(!emailInput.value || !passwordInput.value || !selected) {
    return showError("Invalid Input", "Please fill in all fields and select a user type.");
  } 

  validateCredentials(emailInput.value, passwordInput.value, selected.value)
    .then(isValid => {
      if (isValid) {
        navigateToPage(selected.value);
      } else {
        showError("Error","Invalid email or password! Please try again.");
      }

      emailInput.value = "";
      passwordInput.value = "";
      selected.checked = false; 
    })
    .catch(error => {
      console.error("Error during login:", error);
      showError("Connection Error","An error occurred while logging in. Please try again later.");
    });
  });
  
  
