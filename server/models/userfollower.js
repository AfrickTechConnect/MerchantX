'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollower = sequelize.define('UserFollower', {
    followerId: DataTypes.INTEGER
  }, {});
  UserFollower.associate = function(models) {
    
  };
  return UserFollower;
};