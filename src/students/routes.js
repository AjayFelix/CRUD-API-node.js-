const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getStudents);

router.post("/", controller.addStudent);

router.get("/:id", controller.getStudentById);

router.delete("/:id", controller.deleteStudentById);

router.put("/:id", controller.updateStudentById);

module.exports = router;
