import { Snippet } from '../../models';
import { findUser } from './user';

async function findSnippet(keys, expectExistence = true) {
  const snippet = await Snippet.findOne({ where: keys });
  if (!snippet && expectExistence) {
    throw Error('Snippet does not exist!');
  }
  if (snippet && !expectExistence) {
    throw Error('Snippet already exists!');
  }
  return snippet;
}

export default {
  Query: {
    snippets() {
      return Snippet.findAll();
    },

    snippet(_, { info }) {
      return Snippet.find({
        where: {
          ...info,
        }
      });
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
      return Snippet.create({
        author: user.name,
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
