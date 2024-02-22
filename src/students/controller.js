const pool = require("../../db");
const queries = require("./queries");

// get all students
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// get student by id
const getStudentById = (req, res) => {
  let id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.status(400).send("Email already exists");
    } else {
      // Add student to database
      pool.query(
        queries.addStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Student created successfully");
        }
      );
    }
  });
};
const deleteStudentById = (req, res) => {
  let id = parseInt(req.params.id);
  // Check if student exists
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (!results.rows.length) {
      res.status(400).send("Student id does not exist");
    }
    // Delete student from database
    pool.query(queries.deleteStudentById, [id], (error, results) => {
      if (error) throw error;
      res.send("Student deleted successfully");
    });
  });
};
const updateStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  // Check if student exists
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("Student id does not exist");
    }
    // Update student's name
    pool.query(queries.updateStudentById, [name, id], (error, results) => {
      if (error) throw error;
      res.send("Student updated successfully");
    });
  });
};
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentById,
};
