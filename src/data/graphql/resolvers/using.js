import { findUser } from './user';
import { findSnippet } from './snippet';
import { findPreset } from './preset';

export default {
  Mutation: {
    async useSnippet(_, { name, info }) {
      const user = await findUser({ name });
      const snippet = await findSnippet({ ...info });
      await user.addUsingSnippet(snippet);
      return user;
    },

    async notUseSnippet(_, { name, info }) {
      const user = await findUser({ name });
      const snippet = await findSnippet({ ...info });
      await user.removeUsingSnippet(snippet);
      return user;
    },

    async usePreset(_, { name, info }) {
      const user = await findUser({ name });
      const preset = await findPreset({ ...info });
      await user.addUsingPreset(preset);
      return user;
    },

    async notUsePreset(_, { name, info }) {
      const user = await findUser({ name });
      const preset = await findPreset({ ...info });
      await user.removeUsingPreset(preset);
      return user;
    },
  }
};
