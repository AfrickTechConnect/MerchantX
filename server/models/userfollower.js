/* eslint-disable func-names */

module.exports = (sequelize, DataTypes) => {
  const UserFollower = sequelize.define('UserFollower', {
    followerId: DataTypes.INTEGER
  }, {});
  UserFollower.associate = function (models) {
    UserFollower.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'following'
    });
    UserFollower.belongsTo(models.User, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      as: 'follower'
    });
  };
  return UserFollower;
};
