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
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a "first name"',
                },
                notEmpty: {
                    msg: 'Please provide a "first name"',
                },
            },
        },
        // Last Name Column
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a "last name"',
                },
                notEmpty: {
                    msg: 'Please provide a "last name"',
                },
            },
        },
        // Email Address Column
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This email address already exists',
            },
            validate: {
                isEmail: {
                    msg: 'Email address is not valid',
                },
                notNull: {
                    msg: 'Please provide an "email address"',
                },
                notEmpty: {
                    msg: 'Please provide an "email address"',
                },
            },
        },
        // Password Column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a "password"',
                },
                notEmpty: {
                    msg: 'Please provide a "password"',
                }, 
            },
        }
    }, { sequelize })

    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return User;
}