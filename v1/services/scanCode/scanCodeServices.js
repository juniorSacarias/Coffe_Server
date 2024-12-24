const ScanCodeDatabases = require('../../database/scanCode/scanCodeDatabases');

const getAllScanCodes = callback => {
    ScanCodeDatabases.getAllScanCodes((err, result) => {
        if (err) {
            console.error('Error al obtener los códigos:', err);
            callback(err, null); // Si hay error, lo pasamos al callback
        } else {
            callback(null, result); // Si no hay error, pasamos el resultado al callback
        }
    });
};

const getScanCodeByCode = (code, callback) => {
    ScanCodeDatabases.getScanCodeByCode(code, (err, result) => {
        if (err) {
            console.error('Error al obtener el código:', err);
            callback(err, null); // Si hay error, lo pasamos al callback
        } else {
            callback(null, result); // Si no hay error, pasamos el resultado al callback
        }
    });
};

const createScanCode = (newScanCode, callback) => {
    ScanCodeDatabases.createScanCode(newScanCode, (err, result) => {
        if (err) {
            console.error('Error al crear el código:', err);
            callback(err, null); // Si hay error, lo pasamos al callback
        } else {
            callback(null, result); // Si no hay error, pasamos el resultado al callback
        }
    });
};

module.exports = {
    getAllScanCodes,
    getScanCodeByCode,
    createScanCode
};