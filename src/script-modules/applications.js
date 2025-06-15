import { showError, showConfirmation, showAlert,injectModal} from "../components/modals.js";
import {showSuccess,injectToast} from "../components/toast.js";
import {  isNewApplication, submitData } from "../services/databasemanagement.js";
const params = new URLSearchParams(window.location.search);

document.body.insertAdjacentHTML("beforeend",injectModal());
document.body.insertAdjacentHTML("beforeend",injectToast());
const newJobId = params.get("jobId");
const form = document.getElementById('applicat-form');

form.addEventListener("submit", async (event) => {
  
  event.preventDefault(); 

  try {
    if(!newJobId){
       showError("Error","No Job Selected For Application");
       return;
    }
    const jobId = newJobId;
    const fullName = document.getElementById('fullname').value;
    const fatherName = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const cnic = document.getElementById('cnic').value;
    const address = document.getElementById('address').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const phone = document.getElementById('phonenumber').value;
    const status = "pending";

    // Validate form fields
    if (!fullName.trim() || !email.trim() || !cnic.trim() || !fatherName.trim() || !address.trim() || !education.trim() || !experience || !phone.trim()) {
      showAlert("Alert", "Please fill in all fields.");
      return;
    }

    if (!(await isNewApplication(newJobId, cnic))) {
      showAlert("Already Applied", "You have already applied for this job.");
      return;
    }

    const applicationData = {
      jobId:jobId,
      fullName:fullName,
      fatherName:fatherName,
      email:email,
      cnic:cnic,
      address:address,
      education:education,
      experience:experience,
      phone:phone,
      status:status
    };

    const response = await submitData(applicationData, "applications", "POST");
    if (!response) {
      showError("Connection Error", "Could not submit application!");
    } else {
      setTimeout(()=> history.back(),1500);
      showSuccess("Success!", "Application Submitted Successfully...");
      console.log("Form submit caught");
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    showError("Submission Error", "An unexpected error occurred.");
  }
  console.log("Form submit caught");
});
