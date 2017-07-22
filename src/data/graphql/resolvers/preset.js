import {
  findUser,
  findSnippet,
  findPreset,
} from '../../utils';
import { Preset } from '../../models';

export default {
  Query: {
    presets: () => Preset.findAll(),

    preset(_, { info }) {
      return Preset.findOne({ where: { ...info } });
    },
  },

  Mutation: {
    async createPreset(_, { info }) {
      await Promise.all([
        findUser({ name: info.author }),
        findPreset(info, false),
      ]);
      return Preset.create({ ...info });
    },

    async deletePreset(_, { info }) {
      const preset = await findPreset(info);
      await preset.destroy();
      return true;
    },

    async collectSnippetToPreset(_, { snippetInfo, presetInfo }) {
      const [preset, snippet] = await Promise.all([
        findPreset(presetInfo),
        findSnippet(snippetInfo),
      ]);
      await preset.addSnippet(snippet);
      return preset;
    },

    async removeSnippetFromPreset(_, { snippetInfo, presetInfo }) {
      const [preset, snippet] = await Promise.all([
        findPreset(presetInfo),
        findSnippet(snippetInfo),
      ]);
      await preset.removeSnippet(snippet);
      return preset;
    },
  },

  Preset: {
    snippets: self => self.getSnippets(),
  },
};
