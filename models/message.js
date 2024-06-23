const Sequelize = require('sequelize');

const database = require('../util/database');

const  Message = database.define('messages',{
    msgId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username : {
        type: Sequelize.STRING,
        allowNull: false
    },
    message : {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

module.exports = Message;