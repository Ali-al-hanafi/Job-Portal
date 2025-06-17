
import { showConfirmation,showAlert,showError } from "../components/modals.js";
import { showSuccess,injectToast } from "../components/toast.js";

export async function fetchJobsForUser(callback) {
  try {
    const response = await fetch("http://localhost:5000/jobs");
    if (!response.ok) throw new Error("Failed to fetch jobs.");
    const jobsData = await response.json();
    callback(jobsData);
  } catch (error) {
    console.error("Error:", error);
    showAlert("Connection Error","Failed to load jobs. Please try again later.");
  }
}

export async function fetchJobsForEmployer(callback, companyEmail) {
  try {
    const response = await fetch("http://localhost:5000/jobs");
    if (!response.ok) throw new Error("Failed to fetch jobs.");
    const allJobs = await response.json();
    const filteredJobs = allJobs.filter(job => job.companyEmail === companyEmail);
    callback(filteredJobs); // pass jobs to callback
  } catch (error) {
    console.error("Error:", error);
    showError("Error", "Failed to load jobs.");
  }
}


export const fetchApplications = async (callback,jobId) => {
  try {
    const response = await fetch("http://localhost:5000/applications");
    if (!response.ok) throw new Error("Failed to fetch applications.");
    let applicationsData = await response.json();
    applicationsData = applicationsData.filter(item => item.jobId === jobId);
    callback(applicationsData);
  } catch (error) {
    console.error("Error:", error);
    showAlert("Connection Error", "Failed to load applications. Please try again later.");
  }
}

export const validateCredentials = async (email, password, role) => {
  try {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
   const isValid = data.some(user =>
      user.email === email &&
      user.password === password &&
      user.role === role
    );
      
    return isValid;
  } catch (error) {
    console.error("Error validating credentials:", error);
    return false;
  }
}

export  const registerUser = async (email, password, role) => {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
     return true;
    
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}



export async function addJob(jobData) {
  try {
    const response = await fetch("http://localhost:5000/jobs", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to add job.");
    }
  } catch (error) {
    console.error("Error adding job:", error);
    return false;
  }
}

export const applyForJob = async (applicationData) => {
 try{
const response = await fetch("http://localhost:5000/applications", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(applicationData)
});
    
    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to submit application.");
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    return false;
  }
}

export const isNewApplication = async (jobId, cnic) => {
  try {
    const response = await fetch(`http://localhost:5000/applications`);
    if (!response.ok) throw new Error("Failed to fetch applications.");
    const applications = await response.json();

    return !applications.some(app => app.jobId == jobId && app.cnic == cnic);
  } catch (error) {
    console.error("Error checking for existing application:", error);
    return true; 
  }
}


// Functions Go here
export async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:5000/users");
    if (!response.ok) throw new Error("Failed to fetch users.");
    const usersData = await response.json();
    return usersData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const fetchAllData = async (endPoint) => {
  try {
    const response = await fetch(`http://localhost:5000/${endPoint}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const submitData = async (data, endPoint, methods = 'POST') => {
  try {
    const response = await fetch(`http://localhost:5000/${endPoint}`, {
      method: methods,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    } 
    return true;
  } catch (error) {
    console.error("Error submitting data:", error);
    return false;
  }
};


   export const deleteData = async (endPoint, id) => {
     try {
       const response = await fetch(`http://localhost:5000/${endPoint}/${id}`, {
         method: "DELETE",
       });

       return response.ok;
     } catch (error) {
       console.error("Error deleting job:", error);
       return false;
     }
   };
   

