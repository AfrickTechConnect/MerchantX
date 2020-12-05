import uuid from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      identificationUrl: {
        type: DataTypes.STRING,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      proofAddress: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      }
    }
  );
  User.associate = (models) => {
    User.hasOne(models.Investor, {
      foreignKey: 'userId'
    });
    User.hasOne(models.Merchant, {
      foreignKey: 'userId'
    });
  };
  User.findByEmail = async (email) => {
    try{
      const user = await User.findOne({ where: { email } });
      if (user) return user.dataValues;
      return null;
    } catch(e) {
      console.log(e, 'error>>>>')
    }

  };
  User.findById = async (id, models) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });
    if (user) return user.dataValues;
    return null;
  };
  User.beforeCreate(user => user.id = uuid());
  return User;
};