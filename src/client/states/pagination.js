import { FETCH_SUCCESS } from './fetch';

const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = (current) => ({
  type: CHANGE_PAGE,
  current
});

const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE';
export const changePageSize = (pageSize) => ({
  type: CHANGE_PAGE_SIZE,
  pageSize
});

const CHANGE_PAGE_TOTAL = 'CHANGE_PAGE_TOTAL';
export const changePageTotal = (total) => ({
  type: CHANGE_PAGE_TOTAL,
  total
});

export const pagination = (state = {
  current: 1,
  pageSize: 30,
  total: 0,
  mountPoint: 'nothing', 
  from: 0,
  to: 30,
}, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        current: action.current,
        from: (action.current - 1) * state.pageSize,
        to: action.current * state.pageSize,
      });
    case CHANGE_PAGE_SIZE:
      return Object.assign({}, state, {
        pageSize: action.pageSize,
        from: (state.current - 1) * action.pageSize,
        to: state.current * action.pageSize,
      });
    case CHANGE_PAGE_TOTAL:
      return Object.assign({}, state, {
        total: action.total
      });
    default:
      return state;
  }
};