const express = require('express');
const router = express.Router();

const scanCodeController = require('../../controllers/scanCode/scanCode_controller');

router.get('/', scanCodeController.getAllScanCodes);
router.get('/:code', scanCodeController.getScanCodeByCode);
router.post('/', scanCodeController.createScanCode);

module.exports = router;