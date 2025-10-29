import { loadStripe } from "@stripe/stripe-js";
import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuth } from "./context/GlobalState";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51SMQJrIXJ4jf1Bdh0hgteNPPfzz9PckWF7xWT7WYmJA0SpULERiFkKPozIht7DOFxgReICBkJiMQuYwuqoNboopk00hPA7ciYV"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/Checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/Payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<h1>page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
