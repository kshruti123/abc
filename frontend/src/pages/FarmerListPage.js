import FarmerListPageComponent from "./components/FarmerListPageComponent";
import axios from "axios";
// const proceedFilters = (filters) => {
//   let filtersUrl = "";
//   Object.keys(filters).map((key, index) => {
//     if (key === "rating") {
//       let rat = "";
//       Object.keys(filters[key]).map((key2, index2) => {
//         if (filters[key][key2]) rat += `${key2},`;
//         return "";
//       }, "");
//       filtersUrl += "&rating=" + rat;
//     }
//     return "";
//   });
//   return filtersUrl;
// };
const getFarmers = async (filters={},sortOption = "") => {
  // let filtersUrl = proceedFilters(filters);
  // const url = `/api/farmers/&sort=${sortOption}`;
  const { data } = await axios.get(`/api/farmers/`);
  return data;
};
const FarmerListPage = () => {
  return <FarmerListPageComponent getFarmers={getFarmers} />;
};
export default FarmerListPage; // i do export here in order to import that file here in App.jsnp
