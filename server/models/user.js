/* eslint-disable func-names */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    followingsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'user followings count must be an integer'
        },
        min: {
          args: [0],
          msg: 'user followings count must not be less than 0'
        }
      }
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'user followers count must be an integer'
        },
        min: {
          args: [0],
          msg: 'user followers count must not be less than 0'
        }
      }
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.UserFollower, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'AllFollowers'
    });
    User.hasMany(models.UserFollower, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      as: 'AllFollowings'
    });
  };

  User.findByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) return user;
    return null;
  };

  User.findById = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (user) return user;
    return null;
  };

  User.updatePasswordById = async (id, newPassword) => {
    const user = await User.update(
      { password: newPassword },
      { where: { id } }
    );
    return user[0];
  };
  return User;
};
