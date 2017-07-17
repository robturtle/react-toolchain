import {
  User,
} from '../../models';

export default {
  users: () => User.findAll(),

  user: ({ refType, ref }) => {
    if (refType === 'BY_EMAIL') {
      return User.findOne({ where: { email: ref } });
    }

    return User.findOne({ where: { name: ref } });
  },

  createUser: ({ info }) => User.create(info).then(u => u),

  updateUser: async ({ info }) => {
    const user = await User.findOne({ where: { name: info.name } });
    await user.update(info);

    return user;
  },

  deleteUser: async ({ info }) => {
    const userExists = await User.findOne({ where: {
      email: info.email,
      name: info.name,
     } }) !== null;
    await User.destroy({ where: { name: info.name } });

    return userExists;
  },
};
