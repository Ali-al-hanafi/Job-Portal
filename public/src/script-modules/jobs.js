import { injectModal } from "../components/modals.js";
import { fetchAllData } from "../services/databasemanagement.js";
const jobsList = document.getElementById("jobs-list");
const searchInput = document.getElementById("search-input");
const filters = document.querySelectorAll(".filter-btn");
const btnShowStatus= document.getElementById("btnFloatingAction");

document.body.insertAdjacentHTML("beforeend",injectModal());

let jobs = [];

async function fetchJobs(){
  const allJobs = await fetchAllData("jobs");
   jobs = allJobs;
   renderJobs(jobs);
}
 fetchJobs();

const renderJobs = (jobsArray) => {
  jobsList.innerHTML = jobsArray.length
    ? jobsArray.map(displayJobs).join("")
    : `<li class="text-muted">No jobs found.</li>`;
};


const displayJobs = (job) => `
  <li data-job-id = ${job.id} class="job-item mb-4 p-3 border rounded shadow-sm">
    <h2>${job.title}</h2>
    <h4 class="text-muted">Company: ${job.companyName}</h4>
    <p><strong>Salary:</strong> ${job.salary}</p>
    <p><strong>Job Type:</strong> ${job.jobType}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Email:</strong> ${job.companyEmail}</p>
    <p><strong>Vacancies:</strong> ${job.vacancies}</p>
    <button class="btn btn-outline-primary mt-2"
      onclick="window.location.href='applicationform.html?jobId=${job.id}'">
      Apply Now
    </button>
  </li>
`;


searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  const filteredJobs = jobs.filter(
    ({ title, companyName }) =>
      title.toLowerCase().includes(query) ||
      companyName.toLowerCase().includes(query)
  );
  renderJobs(filteredJobs);
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filter.classList.toggle("active");
    filters.forEach((f) => {
      if (f !== filter) f.classList.remove("active");
    });
    const filterType = filter.dataset.filter;
    if (!filterType) {
      renderJobs(jobs);
      return;
    }
    const filteredJobs = jobs.filter((job) => job.jobType.toLowerCase() === filterType.toLowerCase());
    renderJobs(filteredJobs);
  });
});

btnShowStatus.addEventListener("click", async (event) => {
  event.preventDefault();

  const modalShowApp = new bootstrap.Modal(document.getElementById('customModal'));
  const modalBody = document.getElementById('modalBody');

  let applications = await fetchAllData("applications");

  let html = `
    <input type='search' class="form-control mb-3 inputForApp" placeholder="Enter Your CNIC or Name...">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>CNIC</th>
          <th>Name</th>
          <th>Applied For</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="appTableBody">
        ${applications.map(item => {
          const job = jobs.find(job => job.id == item.jobId);
          if(!job){
            return ;
          }
          return `
            <tr>
              <td>${item.cnic}</td>
              <td>${item.fullName}</td>
              <td>${job.title }</td>
              <td>${item.status || 'Pending'}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  modalBody.innerHTML = html;
  modalShowApp.show();

  document.querySelector('.inputForApp').addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    const filtered = applications.filter(app =>
      app.cnic.toLowerCase().includes(query) ||
      app.fullName.toLowerCase().includes(query)
    );

    const tableBody = document.getElementById('appTableBody');
    tableBody.innerHTML = filtered.map(item => {
      const job = jobs.find(job => job.id == item.jobId);
      return `
        <tr>
          <td>${item.cnic}</td>
          <td>${item.fullName}</td>
          <td>${ job.title}</td>
          <td>${item.status || 'Pending'}</td>
        </tr>
      `;
    }).join('');
  });
});
