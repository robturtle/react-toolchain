import connection from './connection';
import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return connection.sync(...args);
}

export default { sync };
export {
  User,
  UserLogin,
  UserProfile,
};
