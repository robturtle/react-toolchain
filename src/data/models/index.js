import connection from './connection';
import User from './User';
import UserLogin from './UserLogin';
import Snippet from './Snippet';
import Preset from './Preset';

// Accounts
User.hasMany(UserLogin, {
  as: 'logins',
  foreignKey: 'username',
});

// Snippet ownership
User.hasMany(Snippet, {
  as: 'snippets',
  foreignKey: 'author',
});

User.hasMany(Preset, {
  as: 'presets',
  foreignKey: 'author',
});

Snippet.belongsToMany(Preset, {
  as: 'presets',
  foreignKey: 'collected',
  through: 'collect',
});
Preset.belongsToMany(Snippet, {
  as: 'snippets',
  foreignKey: 'collector',
  through: 'collect',
});

// Forking
Snippet.belongsTo(Snippet, {
  foreignKey: 'upstream',
});

// Using snippets
Snippet.belongsToMany(User, {
  as: 'usingUsers',
  foreignKey: 'snippet',
  through: 'activate',
});
User.belongsToMany(Snippet, {
  as: 'usingSnippets',
  foreignKey: 'user',
  through: 'activate',
});

Preset.belongsToMany(User, {
  as: 'usingUsers',
  foreignKey: 'user',
  through: 'activatePreset',
});
User.belongsToMany(Preset, {
  as: 'usingPresets',
  foreignKey: 'preset',
  through: 'activatePreset',
});

function sync(...args) {
  return connection.sync(...args);
}

export default {
  sync,
  close: () => connection.close(),
};

export {
  User,
  UserLogin,
  Snippet,
  Preset,
};
