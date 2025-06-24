const { DataTypes } = require('sequelize');
const sequelize = require('../db/zoo');  

const Funcionario = sequelize.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cargo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    datacontrato: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'Funcionario'
});

module.exports = Funcionario;
