import { LOGIN_FARMER, LOGOUT_FARMER } from "../constants/farmerConstants";
import axios from "axios";
export const setReduxFarmerState = (farmerCreated) => (dispatch) => {
  dispatch({ type: LOGIN_FARMER, payload: farmerCreated });
};

export const logoutFarmer = () => (dispatch) => {
  document.location.href = "/login";
  axios.get('/api/logout')
  localStorage.removeItem("farmerInfo");
  sessionStorage.removeItem("farmerInfo");
  localStorage.removeItem("cart");
  dispatch({ type: LOGOUT_FARMER })
}