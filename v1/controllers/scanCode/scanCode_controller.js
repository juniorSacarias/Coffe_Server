const scanCodeService = require('../../services/scanCode/scanCodeServices');

const getAllScanCodes = (req, res) => {
	scanCodeService.getAllScanCodes((err, result) => {
		if (err) {
			console.error('Error al obtener los códigos:', err);
			res.status(500).send('Error al obtener los códigos');
		} else {
			res.status(200).json(result);
		}
	});
};

const getScanCodeByCode = (req, res) => {
	const { code } = req.params;

	if (!code) {
		res.status(400).send('Falta el código');
		return;
	}

	scanCodeService.getScanCodeByCode(code, (err, result) => {
		if (err) {
			console.error('Error al obtener el código:', err);
			res.status(500).send('Error al obtener el código');
		} else {
			res.status(200).json(result);
		}
	});
};

const createScanCode = (req, res) => {
	const { name, code, imageLink } = req.body;

	const newScanCode = {
		name,
		code,
		imageLink
	};

	scanCodeService.createScanCode(newScanCode, (err, result) => {
		if (err) {
			console.error('Error al crear el código:', err);
			res.status(500).send('Error al crear el código');
		} else {
			res.status(201).json(result);
		}
	});
};

module.exports = {
	getAllScanCodes,
	getScanCodeByCode,
	createScanCode
};
