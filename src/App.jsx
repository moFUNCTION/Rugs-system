import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LazyPageWrapper } from "./Components/Common/LazyPageWrapper/LazyPageWrapper";
import "./App.css";
import { Header } from "./Components/Layout/Header/Header";
import { OrderPageBtnNavigation } from "./Components/Common/OrderPageBtnNavigation/OrderPageBtnNavigation";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
import { useUserData } from "./Context/UserDataProvider/UserDataProvider";
import { LogoHeader } from "./Components/Layout/LogoHeader/LogoHeader";
import { Footer } from "./Components/Layout/Footer/Footer";
// Order
const OrderRequest = lazy(() => import("./Feutures/Order/Index"));
// Register
const Register = lazy(() => import("./Feutures/Auth/Register/Index"));
const Login = lazy(() => import("./Feutures/Auth/Login/Index"));
// Orders
const Orders = lazy(() => import("./Feutures/Orders/Index"));
// Order {Id}
const OrderWatch = lazy(() => import("./Feutures/OrderUpdate/Index"));
// User profile
const UserProfile = lazy(() => import("./Feutures/UserProfile/UserProfile"));
// Order Submition
const OrderSubmition = lazy(() =>
  import("./Feutures/ClientOrderSubmition/Index")
);
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { user } = useUserData();

  return (
    <>
      <Header />
      <LogoHeader />
      <OrderPageBtnNavigation />
      <LazyPageWrapper>
        <Routes>
          <Route
            path="/user"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/login",
                }}
                condition={user.data}
                isLoading={user.loading}
              >
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<OrderRequest />} />
          <Route path="order" element={<OrderRequest />} />
          <Route
            path="register"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/",
                }}
                condition={!user.data}
                isLoading={user.loading}
              >
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/",
                }}
                condition={!user.data}
                isLoading={user.loading}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderWatch />} />
          <Route
            path="orders/:id/client-submition"
            element={<OrderSubmition />}
          />
        </Routes>
      </LazyPageWrapper>
      <Footer />
    </>
  );
}

export default App;
