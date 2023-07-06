import FarmersPageComponent from "./components/FarmersPageComponent";
import axios from "axios";
const fetchFarmers = async (abctrl) => {
  const { data } = await axios.get("/api/farmers/admin", {
    signal: abctrl.signal,
  });
  return data;
};
const deleteFarmer = async (farmerId) => {
  const { data } = await axios.delete(`/api/farmers/admin/${farmerId}`);
  return data;
};
const AdminProductsPage = () => {
  return <FarmersPageComponent fetchFarmers={fetchFarmers} deleteFarmer={deleteFarmer} />;
};

export default AdminProductsPage;
