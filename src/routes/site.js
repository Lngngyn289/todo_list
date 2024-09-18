const express = require('express')
const router = express.Router()

const siteeController = require('../app/controller/SiteeController')

router.use('/search', siteeController.search)
router.use('/', siteeController.index)


module.exports = router;