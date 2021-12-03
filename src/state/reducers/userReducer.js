const initState = {
  users: [],
  err: null,
  user2edit: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      state = {
        ...state,
        users: action.payload,
      };
      break;
    case "GET_USERS_FAIL":
      state = {
        ...state,
        err: action.payload,
      };
      break;
    case "ADD_USER":
      state = {
        ...state,
        users: action.payload,
      };
      break;
    case "DELETE_USER":
      state = {
        ...state,
        users: action.payload,
      };
      break;
    case "GET_USER":
      state = {
        ...state,
        user2edit: action.payload,
      };
      break;
    case "CANCEL_USER":
      state = {
        ...state,
        user2edit: null,
      };
      break;
    default:
      break;
  }
  return state;
};
