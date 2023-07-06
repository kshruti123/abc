import FarmerRegisterPageComponent from "../components/FarmerRegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxFarmerState } from "../../redux/actions/farmerActions";
// const fetchFarmer = async (farmerId) => {
//   const { data } = await axios.get(`/api/farmers/get-one/${farmerId}`);
//   return data;
// };

const registerFarmerApiRequest = async (formInputs) => {
  const { data } = await axios.post("/api/farmers/register", { ...formInputs });
  return data;
};
const uploadImageApiRequest = async (images, farmerId) => {
  const formData = new FormData();
  console.log(images);
  formData.append("image", images[0]);

  console.log(formData); // Add this line to check the form data

  await axios.post(`/api/farmers/uploadImage?farmerId=${farmerId}`, formData);
};

const uploadLicenseApiRequest = async (license, farmerId) => {
  console.log(license);
  const formData = new FormData();
  formData.append("license", license[0]);
  console.log(formData);
  await axios.post(`/api/farmers/uploadFile?farmerId=${farmerId}`, formData);
};
const uploadImagesCloudinaryApiRequest = (images, farmerId) => {
  const url = "https://api.cloudinary.com/v1_1/dgsjznlim/image/upload";
  const uploadPromises = [];

  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("file", images[i]);
    formData.append("upload_preset", "b96vsshb");

    const uploadPromise = fetch(url, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) =>
        axios.post(`/api/farmers/uploadImage?cloudinary=true&farmerId=${farmerId}`, data)
      );

    uploadPromises.push(uploadPromise);
  }

  return Promise.all(uploadPromises);
};
const uploadLicenseCloudinaryApiRequest = (license, farmerId) => {
  const url = "https://api.cloudinary.com/v1_1/dgsjznlim/image/upload";
  const uploadPromises = [];

  for (let i = 0; i < license.length; i++) {
    const formData = new FormData();
    formData.append("file", license[i]);
    formData.append("upload_preset", "b96vsshb");

    const uploadPromise = fetch(url, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) =>
        axios.post(`/api/farmers/uploadFile?cloudinary=true&farmerId=${farmerId}`, data)
      );

    uploadPromises.push(uploadPromise);
  }

  return Promise.all(uploadPromises);
};


const FarmerRegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <FarmerRegisterPageComponent
      registerFarmerApiRequest={registerFarmerApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxFarmerState={setReduxFarmerState}
      uploadImageApiRequest={uploadImageApiRequest}
      // fetchFarmer={fetchFarmer}
      uploadLicenseApiRequest={uploadLicenseApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadLicenseCloudinaryApiRequest={uploadLicenseCloudinaryApiRequest}
    />
  );
};
export default FarmerRegisterPage;
