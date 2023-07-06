import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterLoginReducer } from "./reducers/userReducers";
import { farmerRegisterLoginReducer } from "./reducers/farmerReducers";
import thunk from "redux-thunk";
// const store = createStore(counterReducer, { value: 0 },composeWithDevTools());
const reducer = combineReducers({
  farmerRegisterLogin: farmerRegisterLoginReducer,
  userRegisterLogin: userRegisterLoginReducer,
 
});
const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ?JSON.parse( sessionStorage.getItem("userInfo")):{}
const farmerInfoInLocalStorage = localStorage.getItem("farmerInfo")
  ? JSON.parse(localStorage.getItem("farmerInfo"))
  : sessionStorage.getItem("farmerInfo") ?JSON.parse( sessionStorage.getItem("farmerInfo")):{}
const INITIAL_STATE = {
  farmerRegisterLogin: {
    farmerInfo: farmerInfoInLocalStorage,
  },
  userRegisterLogin: {
    userInfo: userInfoInLocalStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);
// console.log(store.getState());
export default store;
