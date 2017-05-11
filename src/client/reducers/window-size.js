import { WINDOW_RESIZE } from './actions/window-size';

export default function windowSize(state={}, action) {
  if (action.type === WINDOW_RESIZE) {
    return {
      windowWidth: action.width,
      windowHeight: action.height,
    };
  }
  return state;
}