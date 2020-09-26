import SequelizeSlugify from 'sequelize-slugify';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 250],
          msg: 'title must be strings between 2 and 250 chars long'
        }
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
  }, {});
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'Author',
      onDelete: 'CASCADE'
    });
  };

  SequelizeSlugify.slugifyModel(Post, {
    source: ['title'],
    overwrite: false,
    replacement: '-'
  });
  return Post;
};
