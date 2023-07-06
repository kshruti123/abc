import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/UserActions";
const updateUserApiRequest = async (
  firstname,
  lastname,
  address,
  area,
  pincode,
  password
) => {
  const { data } = await axios.put("/api/users/profile", {
    firstname,
    lastname,
    address,
    area,
    pincode,
    password,
  });
  return data;
};
const fetchUser = async (id) => {
  const { data } = await axios.get("/api/users/profile/" + id);
  return data;
};
const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      setReduxUserState ={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default UserProfilePage;
