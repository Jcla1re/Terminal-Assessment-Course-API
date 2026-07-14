const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Identify yourself for grading
const myNameAndID = "Jasmin Claire C. Bonilla - [423002562]";

// Hardcoded in-memory array
let courses = [
    {
        id: 1,
        courseCode: "PC24",
        courseName: "System Integration and Architecture 1",
        instructor: "Prof. Grageda",
        submittedBy: myNameAndID
    }
];
let nextId = 2;

// 1. GET /api/courses - Return all courses
app.get('/api/courses', (req, res) => {
    res.status(200).json(courses);
});

// 2. GET /api/courses/:id - Return a specific course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json(course);
});

// 3. POST /api/courses - Add a new course
app.post('/api/courses', (req, res) => {
    const { courseCode, courseName, instructor } = req.body;

    // Validation: 400 Bad Request if missing fields
    if (!courseCode || !courseName) {
        return res.status(400).json({ error: "courseCode and courseName are required." });
    }

    const newCourse = {
        id: nextId++,
        courseCode,
        courseName,
        instructor: instructor || "TBA",
        submittedBy: myNameAndID
    };
    
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// 4. PUT /api/courses/:id - Update an existing course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // Validation: 404 if ID doesn't exist
    if (!course) {
        return res.status(404).json({ error: "Course not found." });
    }

    const { courseCode, courseName, instructor } = req.body;

    // Validation: 400 Bad Request if missing fields
    if (!courseCode || !courseName) {
        return res.status(400).json({ error: "courseCode and courseName are required." });
    }

    course.courseCode = courseCode;
    course.courseName = courseName;
    course.instructor = instructor || course.instructor;

    res.status(200).json(course);
});

// 5. DELETE /api/courses/:id - Delete a course
app.delete('/api/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    // Validation: 404 if ID doesn't exist
    if (courseIndex === -1) {
        return res.status(404).json({ error: "Course not found." });
    }

    courses.splice(courseIndex, 1);
    res.status(200).json({ message: "Course deleted successfully." });
});

// Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An unexpected internal server error occurred." });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});