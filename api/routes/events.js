const express = require('express')

const router = express.Router()
const eventsCtrl = require('../controllers/events')
const helpers = require('../config/helpers')

router.get('/', eventsCtrl.index)
router.get('/:id', eventsCtrl.show)
router.post('/create', eventsCtrl.create)
router.delete('/:id', eventsCtrl.delete)
router.put('/:id', eventsCtrl.update)

module.exports = router