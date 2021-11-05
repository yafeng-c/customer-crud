import axios from "axios";

export const getAllUsers = () => {
  return async (dispatch) => {
    const res = await axios.get(
      "https://random-data-api.com/api/users/random_user?size=10"
    );
    if (res.status === 200) {
      dispatch({
        type: "GET_ALL_USERS",
        payload: res.data,
      });
    } else {
      const { err } = res.data;
      dispatch({
        type: "GET_USERS_FAIL",
        payload: err,
      });
    }
  };
};

export const deleteUser = (users, id) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_USER",
      payload: users.filter((user) => user.id !== id),
    });
  };
};

export const getUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "GET_USER",
      payload: user,
    });
  };
};

export const cancelUser = () => {
  return (dispatch) => {
    dispatch({
      type: "CANCEL_USER",
    });
  };
};

export const editUser = (users) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER",
      payload: users,
    });
  };
};

export const addUser = (users, user) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER",
      payload: [...users, user],
    });
  };
};
