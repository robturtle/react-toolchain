import { UserLogin } from '../../models';
import { findUser } from './utils';

export default {
  Mutation: {
    async createLogin(_, { name, info }) {
      const user = await findUser({ name });
      const login = await UserLogin.create({
        username: user.name,
        loginType: info.loginType,
        key: info.key,
      });
      return login;
    },

    async updateLogin(_, { name, info }) {
      const login = await UserLogin.findOne({
        where: {
          username: name,
          loginType: info.loginType,
        },
      });
      if (!login) {
        throw Error('UserLogin not found!');
      }
      await login.update(info);
      return login;
    },

    async deleteLogin(_, { name, loginType }) {
      const login = await UserLogin.findOne({
        where: {
          username: name,
          loginType,
        },
      });
      if (!login) {
        throw Error('UserLogin not found!');
      }
      await login.destroy();
      return true;
    },
  },
};
