import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/UserActions";
import { setReduxFarmerState } from "../redux/actions/farmerActions";
const loginUserApiRequest = async (phoneNumber, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {  // Update the endpoint URL
    phoneNumber,
    password,
    doNotLogout,
  });
  if (data.userLoggedIn.doNotLogout)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  return data;
};
const loginFarmerApiRequest = async (phoneNumber, password, doNotLogout) => {
  const { data } = await axios.post("/api/farmers/login", {  // Update the endpoint URL
    phoneNumber,
    password,
    doNotLogout,
  });

  if (data.farmerLoggedIn.doNotLogout)
  localStorage.setItem("farmerInfo", JSON.stringify(data.farmerLoggedIn));
  else sessionStorage.setItem("farmerInfo", JSON.stringify(data.farmerLoggedIn));
  return data;
};
const LoginPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      loginFarmerApiRequest={loginFarmerApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
      setReduxFarmerState={setReduxFarmerState}
    />
  );
};

export default LoginPage;
