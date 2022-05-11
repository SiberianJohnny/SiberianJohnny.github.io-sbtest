import { SET_TABLE_DATA } from "../types/tableSortTypes";

export const setTable = (data) => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export const fetchTable = () => (dispatch) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => dispatch(setTable(data)));
};

export const sortTable = (key) => (dispatch) => {
  dispatch(setTable(key))
};

export const filterTable = (query) => (dispatch) => {
  const keys = ['title', 'body']

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query)))
  }
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => dispatch(setTable(search(data))));
};