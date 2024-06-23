const Sequelize = require('sequelize');

const database = require('../util/database');

const  Group = database.define('groups',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    groupname : {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

module.exports = Group;