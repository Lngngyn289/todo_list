const express = require('express')
const router = express.Router()

const meController = require('../app/controller/MeController')
router.get('/stored-courses', meController.mycourse)
router.get('/trash-courses', meController.mytrash)



module.exports = router;