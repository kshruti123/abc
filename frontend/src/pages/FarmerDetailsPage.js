import FarmerDetailsPageComponent from "./components/FarmerDetailsPageComponent";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};
const getFarmerDetails= async(id)=>{
  const {data}= await axios.get(`/api/farmers/get-one/${id}`);
  return data;
}
const orderUserApiRequest = async (
  farmerId,
  productID,
  productname,
  quantity,
  frequency
) => {
  const response = await axios.post(`/api/orders/${farmerId}`, {
    productID,
    productname,
    quantity,
    frequency,
  });
  return response;
};
const writeReviewApiRequest = async(farmerId,formInputs)=>{
  const {data}= await axios.post(`/api/users/review/${farmerId}`,{...formInputs})
  return data;
}
const FarmerDetailsPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.userRegisterLogin.userInfo);
  const location = useLocation();
  const farmerId = location.pathname.split("/")[2];

  return (
    <>
      <FarmerDetailsPageComponent
        orderUserApiRequest={orderUserApiRequest}
        fetchProducts={fetchProducts}
        farmerId={farmerId}
        getFarmerDetails={getFarmerDetails}
        userInfo={userInfo}
        writeReviewApiRequest={writeReviewApiRequest}
      />
    </>
  );
};

export default FarmerDetailsPage;
