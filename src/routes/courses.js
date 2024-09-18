const express = require("express");
const multer = require("multer");
// const storageMulter = require('../app/middlewares/ImageNameMiddleware')
const fileUpload = multer();
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//connect to cloudinary
cloudinary.config({
  cloud_name: "di4nqss0b",
  api_key: "587397285485738",
  api_secret: "MdcOjV7wSr1bU3303zhlsbZu_-c", // Click 'View API Keys' above to copy your API secret
});

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
  function (req, res, next) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  },
  coursesController.update
);


// restore course
router.patch("/:id/restore", coursesController.restore);


// post-> store course 
router.post(
  "/store",
  fileUpload.single("img"),
  coursesController.store
);

router.get("/:slug", coursesController.show);

module.exports = router;
