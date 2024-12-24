const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const ScanCode = sequelize.define(
	'ScanCode',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imageLink: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	},
	{
		tableName: 'scan_codes',
		timestamps: true
	}
);

module.exports = ScanCode;
