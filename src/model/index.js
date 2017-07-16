import connection from './connection';
import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import Scope from './Scope';
import Snippet from './Snippet';

User.hasMany(UserLogin, {
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Scope.belongsTo(Scope, {
  as: 'parent',
  foreignKey: 'parentScope',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Snippet.belongsTo(Scope, {
  as: 'scope',
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
  Scope,
  Snippet,
};
