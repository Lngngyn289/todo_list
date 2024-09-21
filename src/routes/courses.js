const express = require("express");
const multer = require("multer");
// const storageMulter = require('../app/middlewares/ImageNameMiddleware')
const fileUpload = multer();
const router = express.Router();
const uploadCloud = require('../app/middlewares/UploadCloudMiddleware')


const coursesController = require("../app/controller/CoursesController");

//move to create course page
router.get("/create", coursesController.create);

//move to edit course page
router.get("/:id/edit", coursesController.edit);

//submit action form
router.post("/action-handler-form", coursesController.actionHandlerFormSubmit);

//soft delete (move to trash)
router.delete("/:id", coursesController.delete);

//delete course in trash (in db)
router.delete("/:id/deleteindb", coursesController.deleteindb);

// update course
router.put(
  "/:id",
  fileUpload.single("img"),
  coursesController.update
);


// restore course
router.patch("/:id/restore", coursesController.restore);


// post-> store course 
router.post(
  "/store",
  fileUpload.single("img"),
  uploadCloud.uploadCloudinary,
  coursesController.store
);

router.get("/:slug", coursesController.show);

module.exports = router;
