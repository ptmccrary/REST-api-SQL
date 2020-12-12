'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model{}
    User.init({
        // ID column
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // First Name Column
        firstName: {
            type: DataTypes.STRING,
        },
        // Last Name Column
        lastName: {
            type: DataTypes.STRING,
        },
        // Email Address Column
        emailAddress: {
            type: DataTypes.STRING,
        },
        // Password Column
        password: {
            type: DataTypes.STRING,
        }
    }, { sequelize })

    return User;
}