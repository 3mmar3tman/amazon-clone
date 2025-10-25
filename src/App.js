// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuth } from "./context/GlobalState";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
function App() {
  const { dispatch } = useAuth();
  //   const stripePromise = loadStripe(
  //   "pk_test_51M8qBGGgMfG9lrQtwQD96xCOGZUGCke60ampxG6veTlOT3bRrKATseNAiOzXTUNYB7GyXIDHzsgSTqkcMXgnHCXL00jKa12Jue"
  // );
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
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<h1>page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
