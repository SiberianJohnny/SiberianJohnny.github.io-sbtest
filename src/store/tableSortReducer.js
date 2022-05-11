import { SET_TABLE_DATA, SORT_TABLE_DATA } from "./types/tableSortTypes";

const initialState = {
  sortKey: 'id',
  tableData: []
};

const tableSortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TABLE_DATA:
      return {
        ...state, tableData: payload
      }
    case SORT_TABLE_DATA:
      return {
        ...state, sortKey: payload
      }
    default:
      return state;
  }
};

export default tableSortReducer;