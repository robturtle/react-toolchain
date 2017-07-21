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
  Query: {
    users: () => User.findAll({
      include: ['logins'],
    }),

    user(_, { refType, ref }) {
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
  },

  Mutation: {
    async confirmEmail(_, { info }) {
      const user = await findUser(info);
      await user.update({ emailConfirmed: true });
      return true;
    },

    async createUser(_, { info }) {
      await findUser(info, false);
      const user = await User.create(info);
      return user;
    },

    async updateUser(_, { info }) {
      const user = await findUser(info);
      await user.update(info);
      return user;
    },

    async deleteUser(_, { info }) {
      // TODO: backup his snippets/presets first
      const user = await findUser(info);
      await user.destroy();
      return true;
    },
  },
};
