const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const AppClient = sequelize.define(
	'AppClient',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		appTitle: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imageLink: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'appClients',
		timestamps: false
	}
);

module.exports = AppClient;
