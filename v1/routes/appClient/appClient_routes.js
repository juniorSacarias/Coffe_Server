const express = require('express');
const router = express.Router();

const appClientController = require('../../controllers/appClient/appClientController');

router.get('/', appClientController.getAppClients);
router.get('/:client', appClientController.getAppClientByName);
/*
router.post
router.put
router.delete*/

module.exports = router;
