import UserRegisterPageComponent from "../components/UserRegisterPageComponent";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setReduxUserState } from "../../redux/actions/UserActions";
const registerUserApiRequest = async (
  firstname,
  lastname,
  phoneNumber,
  password,
  address,
  area,
  pincode
) => {
  try {
    const response = await axios.post("/api/users/register", {
      firstname,
      lastname,
      phoneNumber,
      password,
      address,
      area,
      pincode,
    });
    if (response && response.data) {
      return response.data;
    } else {
      console.log("Invalid response:", response);
      return null; // or throw an error
    }
  }catch (error) {
    console.log("Error:", error.message);
    console.log("Error Response:", error.response);
    throw error;
  }
  
};

const UserRegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <UserRegisterPageComponent
      registerUserApiRequest={registerUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default UserRegisterPage;
