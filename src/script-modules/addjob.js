import { showError, showAlert,injectModal } from "../components/modals.js";
import { showSuccess,injectToast } from "../components/toast.js";
import { submitData} from "../services/databasemanagement.js";

document.body.insertAdjacentHTML("beforeend",injectModal());
document.body.insertAdjacentHTML("beforeend",injectToast());

const addJobForm = document.getElementById('job-details');

const companyEmail = new URLSearchParams(window.location.search).get("email");
  const companyEmailInput = document.getElementById('email');


  companyEmailInput.value = companyEmail;
  companyEmailInput.readOnly = true;

addJobForm.addEventListener('submit', async (event) => {
   event.preventDefault();
 try{
  const title = document.getElementById('job-title').value;
  const companyName = document.getElementById('company-name').value;
  const salary = document.getElementById('salary').value;
  const jobType = document.querySelector('input[name="job-type"]:checked').value;
  const location = document.getElementById('location').value;
  const vacancies = document.getElementById('vacancies').value;
  
  if (!title.trim() || !companyName.trim() || !salary.trim() || !location.trim() || !vacancies) {
    showAlert("Alert!","Please fill in all fields.");
    return;
  }
  
  if(!jobType){
    showError("Error","Please Select a Job Type!");
  }
  if(salary < 10000) {
    showAlert("Alert","Minimum Salary should be at least PKR 10,000/-.");
    return;
  }

  if(vacancies < 1){
    showError("Invalid Value", "Please Select a valid value for field 'vacancies'! ");
  }

  const jobData = {
    title:title,
    companyName:companyName,
    salary:salary,
    jobType:jobType,
    location:location,
    companyEmail:companyEmail,
    vacancies:vacancies
  };

 const response =  await submitData(jobData,"jobs",'POST');
       if(!response){
         showError("Error","Submission failed!");
        console.log("Form Submission Caught");
       } else {
         setTimeout(()=> history.back(),1500);
        showSuccess("Success","Job added successfully!");
       }
       console.log("Form Submission Caught");
      }
      catch(error){
        console.log("Error",error);
      }
    console.log("Form Submission Caught");
});