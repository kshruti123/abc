import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";

//user components
// import RouteWithUserChatComponent from "./components/user/RouteWithUserChatComponent";
//publicly available pages
import HomePage from "./pages/HomePage";
import FarmerListPage from "./pages/FarmerListPage";
import FarmerDetailsPage from "./pages/FarmerDetailsPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
//protected User pages
import UserOrderPage from "./pages/user/UserOrdersPage";
import UserCartPage from "./pages/user/UserCartPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserProfilePage from "./pages/user/UserProfilepage";
import UserRegisterPage from "./pages/user/UserRegisterPage";
//protected admin pages
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminFarmerPage from "./pages/admin/AdminFarmerPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminChartsPage from "./pages/admin/AdminChartsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import ScrollToTop from "./utils/ScrollToTop";
//protected farmers pages
import FarmerProfilepage from "./pages/farmer/FarmerProfilepage";
import FarmerCreateProductspage from "./pages/farmer/FarmerCreateProductspage";
import FarmerEditProductPage from "./pages/farmer/FarmerEditProductPage";
import FarmerOrderDetailsPage from "./pages/farmer/FarmerOrderDetailsPage";
import FarmerProductPage from "./pages/farmer/FarmerProductPage";
import FarmerCapitalBudgettingPage from "./pages/farmer/FarmerCapitalBudgetting";
import FarmerVetListPage from "./pages/farmer/FarmerVetListPage";
import FarmerRegisterPage from "./pages/farmer/FarmerRegisterPage";
import Exp from "./pages/farmer/Exp";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        {/* <Route element={<RouteWithUserChatComponent />}> */}
          {/* publicly available routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/farmer-list" element={<FarmerListPage />} />
          <Route path="/farmer-details/:id" element={<FarmerDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="user/register" element={<UserRegisterPage />} />
          <Route path="/farmer/register" element={<FarmerRegisterPage />} />
          <Route path="/blog/page" element={<BlogPage />} />
          <Route path="*" element="Page not exists 404" />
        {/* </Route> */}
        {/* user protected routes: */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/cart" element={<UserCartPage />} />
          <Route path="/user/orders" element={<UserOrderPage />} />
          <Route path="/user/cart/details" element={<UserCartDetailsPage />} />
        </Route>
        {/* farmer protected routes: */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/farmer/profile" element={<FarmerProfilepage />} />
          <Route
            path="/farmer/create-products"
            element={<FarmerCreateProductspage />}
          />
          <Route
            path="/farmer/edit-products"
            element={<FarmerEditProductPage />}
          />
          <Route
            path="/farmer/order-details"
            element={<FarmerOrderDetailsPage />}
          />
          <Route path="/farmer/product" element={<FarmerProductPage />} />
          <Route path="/farmer/vet-list" element={<FarmerVetListPage />} />
          <Route path="/farmer/cb" element={<Exp />} />
        </Route>
        {/* admin protected routes: */}
        <Route path="" element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/user" element={<AdminUserPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/farmers" element={<AdminFarmerPage />} />
          <Route
            path="/admin/create-products"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-products"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/charts" element={<AdminChartsPage />} />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
