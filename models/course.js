'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}
    Course.init({
        // ID column
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Course title Column
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a course "title"',
                },
                notEmpty: {
                    msg: 'Please provide a course "title"',
                },
            },
        },
        // Course Description Column
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a course "description"',
                },
                notEmpty: {
                    msg: 'Please provide a course "description"',
                },
            },
        },
        // Estimated Time Column
        estimatedTime: {
            type: DataTypes.STRING,
        },
        // Materials Needed Column
        materialsNeeded: {
            type: DataTypes.STRING,
        },
    }, { sequelize })

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return Course;
}