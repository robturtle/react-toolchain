import {
  User,
} from '../../models';

async function findUser(info, expectExists = true) {
  const user = await User.findOne({ where: { name: info.name } });
  if (!expectExists) {
    if (user) {
      throw Error('User name already exists!');
    }
    if (await User.findOne({ where: { email: info.email } })) {
      throw Error('User email alreay exists!');
    }
  }
  if (!user && expectExists) {
    throw Error('User does not exist!')
  }

  return user;
}

export { findUser };

export default {
  users: () => User.findAll({
    include: ['logins'],
  }),

  user({ refType, ref }) {
    if (refType === 'BY_EMAIL') {
      return User.findOne({
        where: { email: ref },
        include: ['logins'],
      });
    }
    return User.findOne({
      where: { name: ref },
      include: ['logins'],
    });
  },

  async confirmEmail({ info }) {
    const user = await findUser(info);
    await user.update({ emailConfirmed: true });
    return true;
  },

  async createUser({ info }) {
    await findUser(info, false);
    const user = await User.create(info);
    return user;
  },

  async updateUser({ info }) {
    const user = await findUser(info);
    await user.update(info);
    return user;
  },

  async deleteUser({ info }) {
    await findUser(info);
    await User.destroy({ where: { name: info.name } });
    return true;
  },
};
