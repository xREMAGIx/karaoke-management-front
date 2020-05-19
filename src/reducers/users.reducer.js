import { userConstants } from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: false,
  user: null,
  items: [],
  item: null,
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token);
      return {
        loading: false,
        isAuthenticated: true,
      };
    case userConstants.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return { error: action.error };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userConstants.REGISTER_FAILURE:
      return { loading: false, error: action.error };

    case userConstants.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: null,
      };

    case userConstants.GETME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case userConstants.GETME_FAILURE:
      return { error: action.error };

    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users.results,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        // items: state.items.map((user) =>
        //   user.id === action.id ? { ...user, deleting: true } : user
        // ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        // items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        // items: state.items.map((user) => {
        //   if (user.id === action.id) {
        //     // make copy of user without 'deleting:true' property
        //     const { deleting, ...userCopy } = user;
        //     // return copy of user with 'deleteError:[error]' property
        //     return { ...userCopy, deleteError: action.error };
        //   }

        //   return user;
        // }),
      };

    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
      };
    case userConstants.UPDATE_FAILURE:
      return { error: action.error };

    case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.user.result,
      };
    case userConstants.GETBYID_ERROR:
      return { error: action.error };

    default:
      return state;
  }
}
