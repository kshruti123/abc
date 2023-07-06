import { LOGIN_FARMER, LOGOUT_FARMER } from "../constants/farmerConstants";
export const farmerRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_FARMER:
      return {
        ...state,
        farmerInfo: action.payload,
      };
    case LOGOUT_FARMER:
      return {};
    default:
      return state;
  }
};
