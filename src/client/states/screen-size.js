const WINDOW_RESIZE = 'WINDOW_RESIZE';

export const windowResize = (width) => ({
    type: WINDOW_RESIZE,
    width 
});

export function screenSize(state='md', action) {
  if (action.type === WINDOW_RESIZE) {
    const width = action.width;
    if (width < 768) {
      return 'xs';
    } else if (width < 992) {
      return 'sm';
    } else if (width < 1200) {
      return 'md';
    } else {
      return 'lg';
    }
  }
  return state;
}