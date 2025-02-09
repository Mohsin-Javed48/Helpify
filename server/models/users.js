'use strict';
const {role}=require('../constants');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //add associations here
  }
  User.init({
    firstName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address :{
      type: DataTypes.STRING,
      allowNull: true,
    },    
    contact :{
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
   
    forgetToken: {
       type: DataTypes.STRING,
       allowNull: true,
     },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: "Users",
    timestamps:true,
  });
  return User;
};