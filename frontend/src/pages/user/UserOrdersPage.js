import UserOrdersPageComponent from "./components/UserOrdersPageComponent";
import axios from "axios";
const fetchorders = async (userId) => {
  const { data } = await axios.get(`/api/orders/user/${userId}`, {
  });
  return data;
};
const UserOrdersPage = () => {
  return <UserOrdersPageComponent
  fetchorders={fetchorders}/>

};

export default UserOrdersPage;

