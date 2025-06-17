import { showConfirmation,showAlert,showError,injectModal } from "../components/modals.js";
import { showSuccess,injectToast } from "../components/toast.js";
import { deleteData,fetchAllData,submitData} from "../services/databasemanagement.js";
const params = new URLSearchParams(window.location.search);
const companyEmail = params.get("email");

document.body.insertAdjacentHTML("beforeend",injectModal());
document.body.insertAdjacentHTML("beforeend",injectToast());

const jobsList = document.getElementById("jobs-list");
const btnAddJob = document.getElementById("btnFloating");
const searchInput = document.getElementById("search-input");

const search = (query, jobsArray) => {
  const filteredJobs = jobsArray.filter(
    ({ title, companyName }) =>
      title.toLowerCase().includes(query.toLowerCase()) ||
      companyName.toLowerCase().includes(query.toLowerCase())
  );
  return filteredJobs;
};

let jobs = [];

const renderJobs = (jobsArray) => {
  jobsList.innerHTML = jobsArray.length
    ? jobsArray.map(displayJobs).join("")
    : `<li class="text-muted">No jobs found.</li>`;

   document.querySelectorAll(".btn-delete-job").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const jobId = btn.dataset.jobId;

    showConfirmation("Delete", "Do you want to delete this item?", async () => {
      try {
        let applications = await fetchAllData("applications");
        applications = applications.filter(app => app.jobId == jobId);

        const response = await deleteData("jobs", jobId);

        if (!response) {
          showError("Error", "Failed to delete item. Please try again later.");
          return;
        }

        for (const app of applications) {
          await deleteData("applications", app.id);
        }
        showSuccess("Deleted", "Item deleted successfully!");
        loadJobs();
      } catch (err) {
        console.error("Deletion failed:", err);
        showError("Error", "Unexpected error occurred.");
      }
    });
  });
});
};

const displayJobs = (job) => `
  <li data-job-id = ${job.id} class="job-item">
    <h2>${job.title}</h2>
    <h4 class="text-muted">Company: ${job.companyName}</h4>
    <p><strong>Salary:</strong> ${job.salary}</p>
    <p><strong>Job Type:</strong> ${job.jobType}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Email:</strong> ${job.companyEmail}</p>
    <p><strong>Vacancies:</strong> ${job.vacancies}</p>
    <button button = "button" data-job-id="${job.id}" class="btn btn-outline-primary btn-edit-job mt-2">Edit Details</button>
    <button type = "button" class="btn btn-danger btn-delete-job mt-2"
      data-job-id="${job.id}">
      Delete
    </button>
    <button type = "button" data-job-id="${job.id}"class="btn btn-outline-secondary mt-2 btn-seeApplications"
     > See Applications </button>
  </li>
`;

 
btnAddJob.addEventListener("click", () => {
  window.location.href = "./jobposting.html?email=" + companyEmail;
});

const loadJobs = async () => {
  const data = await fetchAllData("jobs");
  jobs = data.filter(job => job.companyEmail === companyEmail);
  renderJobs(jobs);
};

loadJobs();

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  const filtered = search(query, jobs);
  renderJobs(filtered);
});


const editJobModal = new bootstrap.Modal(document.getElementById('editJobModal'));

document.addEventListener("click", async function (e) {
  const jobId = e.target.dataset.jobId;
  const job = jobs.find(j => j.id == jobId);

  // Edit Job
  if (e.target.matches(".btn-edit-job")) {
    e.preventDefault();
    if (job) {
      document.getElementById("editJobId").value = job.id;
      document.getElementById("editTitle").value= job.title;
     document.getElementById("editCompanyName").value= job.companyName;
    document.getElementById("editSalary").value = job.salary;
     document.getElementById("editLocation").value = job.location;
   document.getElementById("editCompanyEmail").value = job.companyEmail;
     document.getElementById("editVacancies").value = job.vacancies;
      
      editJobModal.show();
    };
  }

  // See Applications
  else if (e.target.matches(".btn-seeApplications")) {
    e.preventDefault();
    document.getElementById("editJobModalLabel").textContent = "Applications";

    let html = `
      <h4>Job Title: ${job.title}</h4>
      <h5>Company: ${job.companyName}</h5>
      <hr>
    `;

    let applications = await fetchAllData("applications");
    const filteredApps = applications.filter(app => app.jobId == jobId && app.status=="pending");

    if (filteredApps.length === 0) {
      html += `<p class="text-muted">No new applications submitted for this job yet.</p>`;
    } else {
      filteredApps.forEach(element => {
        html += `
          <div class="application-item border rounded p-3 mb-3">
            <p><strong>CNIC:</strong> ${element.cnic}</p>
            <p><strong>Name:</strong> ${element.fullName}</p>
            <p><strong>Father Name:</strong> ${element.fatherName}</p>
            <p><strong>Phone Number:</strong> ${element.phone}</p>
            <p><strong>Address:</strong> ${element.address}</p>
            <p><strong>Email:</strong> ${element.email}</p>
            <p><strong>Education:</strong> ${element.education}</p>
            <p><strong>Experience:</strong> ${element.experience}</p>
            <div class="mt-2">
              <button type = "button" class="btn btn-sm btn-success accept-btn" data-id="${element.id}">Accept</button>
              <button type = "button" class="btn btn-sm btn-danger reject-btn" data-id="${element.id}">Reject</button>
            </div>
          </div>
        `;
      });
    }
    document.getElementById("modal-body").innerHTML = html;
    document.getElementById("modal-footer").innerHTML = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    `;
    editJobModal.show();
  }
});




document.getElementById("saveEditBtn").addEventListener("click", async (ev) => {
  ev.preventDefault();
  const id = document.getElementById("editJobId").value;
  const title = document.getElementById("editTitle").value;
  const companyName = document.getElementById("editCompanyName").value;
  const salary = document.getElementById("editSalary").value;
  const location = document.getElementById("editLocation").value;
  const companyEmail = document.getElementById("editCompanyEmail").value;
  const vacancies = parseInt(document.getElementById("editVacancies").value);

  if(!id || !title || !companyName|| !salary ||!location || !companyEmail ||!vacancies){
        showError("Error","Cannot please fill all fields");
        return;
  }

  const updatedJob = {
    title: title,
    companyName: companyName,
    salary: salary ,
    location: location,
    companyEmail: companyEmail,
    vacancies: vacancies
  };

     const response = await submitData(updatedJob,`jobs/${id}`,"PATCH");
     editJobModal.hide();
     if(response) {
      setTimeout(()=> window.location.reload(),1500);
      showSuccess("Success","Details updated successfully!");
      console.log("Submission Caught");
     }
     else showError("Connection Error!","Failed to update job! please try again later");
     console.log("Form Submission Caught");
});

document.getElementById("modal-body").addEventListener("click", async (event) => {
  event.preventDefault();

  if (event.target.classList.contains("accept-btn")) {
    const id = event.target.dataset.id;
    const response = await submitData({ status: "approved" }, `applications/${id}`, "PATCH");
    if (response) {
      event.target.closest('.application-item').remove();
      console.log("Submission Caught");
    }
    console.log("Submission Caught");
  }

  if (event.target.classList.contains("reject-btn")) {
    const id = event.target.dataset.id;
    const response = await submitData({ status: "rejected" }, `applications/${id}`, "PATCH");
    if (response) {
      event.target.closest('.application-item').remove();
      console.log("Submission Caught");
    }
    console.log("Form Submission Caught");
  }
});

