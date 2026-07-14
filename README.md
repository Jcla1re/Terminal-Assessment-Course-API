# Courses REST API

A lightweight, robust Express.js RESTful API designed to manage institutional course resources. This project features full CRUD capabilities, rigid input validation, automated 400/404 handling, a centralized internal error-catching middleware pipeline, and built-in hooks for future integration patterns.

---

## Prerequisites

Ensure you have the following software installed on your machine before running this application:
*   **Node.js** (v16.x or higher recommended)
*   **npm** (Node Package Manager, comes bundled with Node.js)

---

## Installation & Setup

Follow these exact steps to set up and initialize the project environment on your local machine:

### 1. Initialize the Project Directory
If you are setting this up from scratch, open your terminal and run:
`mkdir courses-api`
`cd courses-api`

### 2. Create the Source Files
Create the core application files within your directory:
*   Create a file named `server.js` and paste the provided application code into it.
*   Create a file named `README.md` and paste this documentation into it.

### 3. Initialize Package Manifest
Generate a clean `package.json` file to manage project dependencies:
`npm init -y`

### 4. Install Dependencies
Install **Express** as a core production dependency, and **Nodemon** as a development helper to automatically restart the server upon saving code changes:
`npm install express`
`npm install --save-dev nodemon`

---

## Running the Server

You can start the application using standard Node.js execution.

### Standard Execution (Production Mode)
Run the server using the standard Node runtime execution path:
`node server.js`

Upon successful startup, the terminal will display:
`Server is running on http://localhost:3000`

---

## API Architecture & Endpoints

All endpoints manage a structural in-memory database array. Every successful creation or retrieval payload includes a required `submittedBy` identifier string containing student credentials for grading compliance.

## API Endpoints
* **GET /api/courses** - Returns the full list of courses as JSON.
* **GET /api/courses/:id** - Returns a specific course by its ID.
* **POST /api/courses** - Creates a new course (requires courseCode and courseName in body).
* **PUT /api/courses/:id** - Updates an existing course by its ID.
* **DELETE /api/courses/:id** - Deletes a course by its ID.

---

## Detailed Data Contracts

### 1. GET /api/courses
*   **URL:** `http://localhost:3000/api/courses`
*   **Response Headers:** `Content-Type: application/json`
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "courseCode": "SIA101",
        "courseName": "System Integration and Architecture 1",
        "units": 3,
        "instructor": "Prof. Smith",
        "submittedBy": "Jasmin Claire Bonilla - [STUDENT_NUMBER]"
      }
    ]
    ```

### 2. POST /api/courses
*   **URL:** `http://localhost:3000/api/courses`
*   **Request Headers:** `Content-Type: application/json`
*   **Valid Request Body:**
    ```json
    {
      "courseCode": "PROG102",
      "courseName": "Advanced Programming",
      "units": 3,
      "instructor": "Jane Doe"
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
      "id": 2,
      "courseCode": "PROG102",
      "courseName": "Advanced Programming",
      "units": 3,
      "instructor": "Jane Doe",
      "submittedBy": "Jasmin Claire Bonilla - [STUDENT_NUMBER]"
    }
    ```

---

## Error Handling Specifications

The API handles runtime errors gracefully through structural status responses rather than leaking stack traces.

### 400 Bad Request (Validation Failure)
Triggered during **POST** or **PUT** interactions if `courseCode` or `courseName` is completely omitted from the payload object.
*   **Status Code:** `400 Bad Request`
*   **Payload Output:**
    ```json
    {
      "error": "courseCode and courseName are required."
    }
    ```

### 404 Not Found (Resource Absence)
Triggered during **GET/:id**, **PUT/:id**, or **DELETE/:id** actions if the targeted numerical course identifier parameter does not map to an existing item inside the array.
*   **Status Code:** `404 Not Found`
*   **Payload Output:**
    ```json
    {
      "error": "Course not found."
    }
    ```

