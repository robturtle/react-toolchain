import { findUser } from './user';
import { findSnippet } from './snippet';
import { Preset } from '../../models';

async function findPreset(keys, expectExistence = true) {
  const preset = await Preset.find({ where: keys });
  if (!preset && expectExistence) {
    throw Error('Preset not exists!');
  }
  if (preset && !expectExistence) {
    throw Error('Preset already exists!');
  }
  return preset;
}

export default {
  Query: {
    presets: () => Preset.findAll(),

    preset(_, { info }) {
      return Preset.findOne({ where: { ...info } });
    },
  },

  Mutation: {
    async createPreset(_, { info }) {
      await findUser({ name: info.author });
      await findPreset(info, false);
      return Preset.create({ ...info });
    },

    async deletePreset(_, { info }) {
      const preset = await findPreset(info);
      await preset.destroy();
      return true;
    },

    async collectSnippetToPreset(_, { snippetInfo, presetInfo }) {
      const preset = await findPreset(presetInfo);
      const snippet = await findSnippet(snippetInfo);
      await preset.addSnippet(snippet);
      return preset;
    },

    async removeSnippetFromPreset(_, { snippetInfo, presetInfo }) {
      const preset = await findPreset(presetInfo);
      const snippet = await findSnippet(snippetInfo);
      await preset.removeSnippet(snippet);
      return preset;
    },
  },

  Preset: {
    snippets: self => self.getSnippets(),
  },
};
