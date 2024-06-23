const Sequelize = require('sequelize');

const database = require('../util/database');

const  userGroups = database.define('userGroups',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idAdmin : {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    
});

module.exports = userGroups;