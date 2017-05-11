export const WINDOW_RESIZE = 'WINDOW_RESIZE';

export default function windowSize(width, height) {
  return {
    type: WINDOW_RESIZE,
    width, height
  };
}