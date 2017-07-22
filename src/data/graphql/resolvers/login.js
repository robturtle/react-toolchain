import { UserLogin } from '../../models';
import {
  findUser,
  findLogin,
} from '../../utils';

export default {
  Mutation: {
    async createLogin(_, { name, info }) {
      const user = await findUser({ name });
      await findLogin({ username: user.name, ...info, }, false);
      return UserLogin.create({
        username: user.name,
        loginType: info.loginType,
        key: info.key,
      });
    },

    async updateLogin(_, { name, loginType, info }) {
      const login = await findLogin({
        username: name,
        loginType,
      });
      await login.update(info);
      return login;
    },

    async deleteLogin(_, { name, loginType }) {
      const login = await findLogin({
        username: name,
        loginType,
      });
      await login.destroy();
      return true;
    },
  },
};
