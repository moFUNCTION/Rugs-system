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
import { OurClients } from "./Components/Layout/OurClients/OurClients";
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
const UserOrders = lazy(() => import("./Feutures/UserProfile/__Nested/Orders"));
const UserInvoices = lazy(() =>
  import("./Feutures/UserProfile/__Nested/Invoices")
);
const UserReceipts = lazy(() =>
  import("./Feutures/UserProfile/__Nested/Receipts")
);
// Order Submition
const OrderSubmition = lazy(() =>
  import("./Feutures/ClientOrderSubmition/Index")
);
const OrderReverify = lazy(() =>
  import("./Feutures/ClientOrderReverify/Index")
);
const OrderCancel = lazy(() => import("./Feutures/CancelOrder/Index"));
// Thanks Page
const ThanksPage = lazy(() => import("./Feutures/ThanksPage/Index"));
// Order Dates
const OrderCalenderDates = lazy(() => import("./Feutures/OrderCalender/Index"));
// Order Pdf
const OrderInvoicePdf = lazy(() => import("./Feutures/OrderInvoicePdf/Index"));
const OrderReceiptPdf = lazy(() => import("./Feutures/OrderRecieptPdf/Index"));
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
          >
            <Route path="*" element />
            <Route path="orders" element={<UserOrders />} />
            <Route path="invoices" element={<UserInvoices />} />
            <Route path="receipts" element={<UserReceipts />} />
          </Route>
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
          <Route path="orders/:id/cancel" element={<OrderCancel />} />

          <Route path="orders/:id/time" element={<OrderCalenderDates />} />
          <Route path="orders/:id/invoice-pdf" element={<OrderInvoicePdf />} />
          <Route path="orders/:id/receipt-pdf" element={<OrderReceiptPdf />} />
          <Route path="thanks-page" element={<ThanksPage />} />
        </Routes>
      </LazyPageWrapper>
      <OurClients />
      <Footer />
    </>
  );
}

export default App;
