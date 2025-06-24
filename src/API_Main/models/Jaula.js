const { DataTypes } = require('sequelize');
const sequelize = require('../db/zoo'); 
const Funcionario = require('./Funcionario');

const Jaula = sequelize.define('Jaula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    localizacao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tamanho:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    funcionarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Funcionario',
          key: 'id'
        }
    }

}, {
    timestamps: false,
    tableName: 'Jaula'
});

Jaula.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });
Funcionario.hasMany(Jaula, { foreignKey: 'funcionarioId' });

module.exports = Jaula;
    