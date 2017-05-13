import { message as M } from 'antd';
import { NO_AUTH } from './auth';

import { FETCH_START } from './fetch';

const DISABLE_MESSAGE = 'DISABLE_MESSAGE';
export const disableMessage = (actionType) => ({
  type: DISABLE_MESSAGE,
  actionType,
});

export const message = (state = 'active', action) => {
  switch(action.type) {
    case NO_AUTH:
      M.info('You have to signin first to do this operation');
      break;
    case FETCH_START:
      M.info(`connect ${action.url}`);
      break;
    default:
      return state;
  }
  return state;
};