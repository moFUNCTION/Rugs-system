import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyPageWrapper } from "./Components/Common/LazyPageWrapper/LazyPageWrapper";
const Order = lazy(() => import("./Feutures/Order/Index"));
import "./App.css";
function App() {
  return (
    <>
      <LazyPageWrapper>
        <Routes>
          <Route path="order" element={<Order />} />
        </Routes>
      </LazyPageWrapper>
    </>
  );
}

export default App;
