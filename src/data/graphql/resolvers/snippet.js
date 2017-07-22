import { Snippet } from '../../models';
import {
  findUser,
  findSnippet,
} from '../../utils';

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
      await Promise.all([
        findUser({ name: info.author }),
        findSnippet({ ...info }, false),
      ]);
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
      const [user, snippet] = await Promise.all([
        findUser({ name: forker }),
        findSnippet({ ...info }),
      ]);
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
      return self.getForks();
    }
  },
};
