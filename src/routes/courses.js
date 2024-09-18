const express = require('express')
const multer  = require('multer')
const storageMulter = require('../app/middlewares/ImageNameMiddleware')
const upload = multer({storage: storageMulter()})
const router = express.Router()

const coursesController = require('../app/controller/CoursesController')
router.get('/create', coursesController.create)
router.get('/:id/edit', coursesController.edit)
router.post('/action-handler-form', coursesController.actionHandlerFormSubmit)
router.delete('/:id', coursesController.delete)
router.delete('/:id/deleteindb', coursesController.deleteindb)
router.put('/:id',upload.single('img'), coursesController.update)
router.patch('/:id/restore', coursesController.restore)
router.post('/store',upload.single('img'), coursesController.store)
router.get('/:slug', coursesController.show)

module.exports = router;