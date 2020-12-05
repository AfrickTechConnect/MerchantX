import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuid(),
        firstname: 'Adeyemi',
        lastname: 'Adekorede',
        email: 'korede@yankeepay.co',
        type: 'admin',
        profilePictureUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstname: 'Ehinze',
        lastname: 'emeka',
        type: 'admin',
        email: 'emeka@yankeepay.co',
        profilePictureUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstname: 'Bassey',
        lastname: 'Akan',
        type: 'admin',
        email: 'bassey@yankeepay.co',
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
