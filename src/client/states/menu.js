const MENU_CLICK = 'MENU_CLICK';
export const menuClick = (key) => ({
  type: MENU_CLICK,
  key
});

export const menu = (state = {
  selectedKeys: [],
}, action) => {
  if (action.type === MENU_CLICK) {
    return action.key;
  }
  return state;
};