const pool = require("../../db");
const queries = require("../student/queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0) {
      res.status(204).json();
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0) {
      res.status(204).send();
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const createStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rowCount) {
      res.send("Email already exist.");
    } else {
      pool.query(
        queries.updateStudent,
        [id, name, email, age, dob],
        (error, result) => {
          if (error) throw error;
          res.status(201).send("Student created successfully!");
        }
      );
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount) {
      pool.query(queries.deleteStudent, [id], (error, result) => {
        if (error) throw error;
        res.status(200).send("Student deleted successfully!");
      });
    } else {
      res.status(404).send(`Student with ID ${id} not found.`);
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount) {
      pool.query(
        queries.updateStudent,
        [id, name, email, age, dob],
        (error, result) => {
          if (error) throw error;
          res.status(200).send("Student updated successfully!");
        }
      );
    } else {
      res.status(404).send(`Student with ID ${id} not found.`);
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
};
