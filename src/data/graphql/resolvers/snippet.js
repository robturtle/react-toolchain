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

    snippet(_, { author, info }) {
      return Snippet.find({
        where: {
          author,
          ...info,
        }
      });
    }
  },

  Mutation: {
    async createSnippet(_, { author, info, contents }) {
      await findUser({ name: author });
      await findSnippet({ author, ...info }, false);
      return Snippet.create({
        author,
        ...info,
        ...contents,
      });
    },

    async updateSnippet(_, { author, info, contents }) {
      const snippet = await findSnippet({ author, ...info });
      await snippet.update({ ...contents });
      return snippet;
    },

    async deleteSnippet(_, { author, info }) {
      const snippet = await findSnippet({ author, ...info });
      await snippet.destroy();
      return true;
    },

    async forkSnippet(_, { forker, author, info }) {
      const user = await findUser({ name: forker });
      const snippet = await findSnippet({ author, ...info });
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
