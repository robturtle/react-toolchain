import { Snippet } from '../../models';
import {
  findUser,
  findSnippet,
} from './utils';

export default {
  Query: {
    snippets() {
      return Snippet.findAll();
    },

    snippet(_, { info }) {
      return Snippet.find({ where: { ...info, } });
    }
  },

  Mutation: {
    async createSnippet(_, { info, contents }) {
      await findUser({ name: info.author });
      await findSnippet({ ...info }, false);
      return Snippet.create({
        ...info,
        ...contents,
      });
    },

    async updateSnippet(_, { info, contents }) {
      const snippet = await findSnippet({ ...info });
      await snippet.update({ ...contents });
      return snippet;
    },

    async deleteSnippet(_, { info }) {
      const snippet = await findSnippet({ ...info });
      await snippet.destroy();
      return true;
    },

    async forkSnippet(_, { forker, info }) {
      const user = await findUser({ name: forker });
      const snippet = await findSnippet({ ...info });
      await findSnippet({
        author: user.name,
        scope: snippet.scope,
        name: snippet.name,
      }, false);
      return Snippet.create({
        author: forker,
        ...snippet.contents,
        upstreamId: snippet.id,
      });
    }
  },

  Snippet: {
    forks(self) {
      return Snippet.findAll({
        where: {
          upstreamId: self.id,
        }
      });
    }
  },
};
