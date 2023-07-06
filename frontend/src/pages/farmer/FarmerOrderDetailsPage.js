import FarmerOrderPageComponent from "../components/FarmerOrdersPageComponent";
import axios from "axios";
const fetchorders = async (farmerId) => {
  const { data } = await axios.get(`/api/orders/farmer/${farmerId}`, {
  });
  return data;
};
const FarmerOrderDetailspage = () => {
  return <FarmerOrderPageComponent
  fetchorders={fetchorders}/>

};

export default FarmerOrderDetailspage;

