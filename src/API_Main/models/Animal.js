const { DataTypes } = require('sequelize');
const sequelize = require('../db/zoo');  
const Jaula = require('./Jaula');

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    especie:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jaulaId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Jaula,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'Animal'
});

Animal.belongsTo(Jaula, {foreignKey:'jaulaId'});
Jaula.hasMany(Animal, {foreignKey:'jaulaId'});
module.exports = Animal;
