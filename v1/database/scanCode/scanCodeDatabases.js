const fs = require('fs');
const path = require('path');

const getAllScanCodes = callback => {
	try {
		const data = fs.readFileSync(path.join(__dirname, '../../../codeScan.json'), 'utf8');
		const scanCodes = JSON.parse(data).scanCodes;
		callback(null, scanCodes);
	} catch (err) {
		console.error('Error en la consulta de códigos', err);
		callback(err, null);
	}
};

const getScanCodeByCode = (code, callback) => {
	try {
		const data = fs.readFileSync(path.join(__dirname, '../../../codeScan.json'), 'utf8');
		const scanCodes = JSON.parse(data).scanCodes;
		const scanCode = scanCodes.find(sc => sc.code === code);
		if (!scanCode) {
			console.error('No se ha encontrado el código');
			return callback(null, null);
		}
		callback(null, scanCode);
	} catch (err) {
		console.error('Error en la consulta de código', err);
		callback(err, null);
	}
};

const createScanCode = (scanCodeToCreate, callback) => {
	try {
		const data = fs.readFileSync(path.join(__dirname, '../../../codeScan.json'), 'utf8');
		const scanCodes = JSON.parse(data).scanCodes;
		const newScanCode = {
			id: scanCodes.length + 1,
			name: scanCodeToCreate.name,
			code: scanCodeToCreate.code,
			imageLink: scanCodeToCreate.imageLink || null,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
		scanCodes.push(newScanCode);
		fs.writeFileSync(path.join(__dirname, '../../../codeScan.json'), JSON.stringify({ scanCodes }, null, 2));
		callback(null, newScanCode);
	} catch (err) {
		console.error('Error al registrar el código:', err);
		callback(err, null);
	}
};

module.exports = {
	getAllScanCodes,
	getScanCodeByCode,
	createScanCode
};
