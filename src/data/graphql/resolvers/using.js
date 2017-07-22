import {
  findUser,
  findSnippet,
  findPreset
} from './utils';

export default {
  Mutation: {
    async useSnippet(_, { name, info }) {
      const [user, snippet] = await Promise.all([
        findUser({ name }),
        findSnippet({ ...info }),
      ]);
      await user.addUsingSnippet(snippet);
      return user;
    },

    async notUseSnippet(_, { name, info }) {
      const [user, snippet] = await Promise.all([
        findUser({ name }),
        findSnippet({ ...info }),
      ]);
      await user.removeUsingSnippet(snippet);
      return user;
    },

    async usePreset(_, { name, info }) {
      const [user, preset] = await Promise.all([
        findUser({ name }),
        findPreset({ ...info }),
      ]);
      await user.addUsingPreset(preset);
      return user;
    },

    async notUsePreset(_, { name, info }) {
      const [user, preset] = await Promise.all([
        findUser({ name }),
        findPreset({ ...info }),
      ]);
      await user.removeUsingPreset(preset);
      return user;
    },
  }
};
