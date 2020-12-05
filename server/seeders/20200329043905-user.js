import bcrypt from 'bcryptjs';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Adeyemi',
        lastname: 'Adekorede',
        email: 'adekorede@mailinator.com',
        type: 'admin',
        profilePictureUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Adeyemi',
        lastname: 'korede',
        type: 'user',
        email: 'ade@mailinator.com',
        profilePictureUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
