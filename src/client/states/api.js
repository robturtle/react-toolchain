import { sendFetch } from './fetch';

export const host = `http://${window.location.host}`;
export const targets = {
  'projects': `${host}/api/projects`,
  'likeProject': `${host}/api/like`,
};

export const likeProject = dispatch => (pid, liked) => {
  dispatch(sendFetch(targets.likeProject, 'like', { pid, liked }));
}

export default targets;