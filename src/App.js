import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Login-reg/Register";
import SignIn from "./Pages/Login-reg/login";
import { Wrapper as Manufacturer } from "./Pages/Manufacturer/Manufacturer";
import { Wrapper as Transporter } from "./Pages/Transporter/Transporter";
import { useProduct } from "./Hooks/useProduct";
export const ProductContext = React.createContext();
function App() {
  const { value } = useProduct();
  return (
    <ProductContext.Provider value={value}>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/transporter" element={<Transporter />} />
          <Route exact path="/manufacturer" element={<Manufacturer />} />
        </Routes>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;
