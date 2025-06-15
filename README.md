# 🧑‍💼 Job Portal – Semester Project

**Student Name:** Ali Hassan Abbasi
**Course:** Web Tecnologies (Semester Project)
**Roll No.**      F23BDOCS1M01019
**Section**        1M
**Project Type:** Frontend with JavaScript + Mock API (JSON Server)

---

## Project Overview

This is a simple but complete Job Portal system developed as a semester project. It simulates real-world recruitment functionality using only frontend technologies and a mock backend (JSON Server). It allows:

- **Employers** to create, update, Edit and delete job posts.
- **Candidates** to view jobs and apply using CNIC and see application status
- **Admin logic**, **validations**, and **business rules** are enforced in JavaScript.

Technical Stack:
HTML5 + CSS3 + Bootstrap 5

JavaScript (modular with ES6 syntax)

JSON Server as backend (mock REST API)

Fetch API for CRUD operations

---

==> Full Setup Instructions

--> Requirements

- Node.js (https://nodejs.org)
- Modern browser (Chrome/Firefox/Edge)
- Basic code editor (VS Code preferred)

--> Installation & Run

1. Clone the Project

```bash (Using Command Prompt)
git clone https://github.com/your-username/job-portal.git
cd job-portal

2-  Install JSON Server Globally
bash

npm install -g json-server

To verify installation:

json-server --version

3. Start JSON Server
Run this command from the project root:

json-server --watch db.json --port 5000
This launches the mock API at: http://localhost:5000

4. Open the Frontend
Open index.html in any browser

Simulate login for:

Employer → employer.html?email=xyz@company.com

Candidate → jobseeker.html?email=example@gmail.com



======> Features List:
 Features

1- Login nd Register
Choose role via form

Uses query parameters or localStorage to identify role

2- Employer Panel
Add new job

Edit job details (title, salary, location, etc.)

Delete job

View list of all jobs added by the employer

See how many applications are received per job

Automatically deletes applications if a job is deleted

3- Candidate Panel
View all available jobs

Apply using CNIC and personal info

Input validation on all fields

Can’t apply to the same job twice (CNIC-restricted)

Can see application status


4- Business Constraints (Fully Enforced)

Constraint	Description
Vacancies > 0	Employer must provide at least one opening
Salary ≥ 10,000 PKR	Minimum salary threshold is enforced
CNIC Uniqueness	A candidate cannot apply to the same job more than once
Cascade Delete	Deleting a job removes all associated applications
Email Format   email must include @,one letter before and after it and . symbol
Field Validations	No field can be blank or whitespace-only
Only Employer Can Modify Jobs	No cross-access between employers

These are enforced in login
.js, employer.js, and jobs.js.



```
