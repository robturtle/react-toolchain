import {
  User,
} from '../../models';
import { findUser } from './utils';

export default {
  Query: {
    users: () => User.findAll({
      include: ['logins'],
    }),

    user(_, { refType, ref }) {
      if (refType === 'BY_EMAIL') {
        return findUser({ email: ref });
      }
      return findUser({ name: ref });
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

    async updateUser(_, { before, after }) {
      const user = await findUser(before);
      await user.update(after);
      return user;
    },

    async deleteUser(_, { info }) {
      // TODO: backup his snippets/presets first
      const user = await findUser(info);
      await user.destroy();
      return true;
    },
  },

  User: {
    logins: self => self.getLogins(),

    snippets: self => self.getSnippets(),

    presets: self => self.getPresets(),

    usingSnippets: self => self.getUsingSnippets(),

    usingPresets: self => self.getUsingPresets(),
  }
};
