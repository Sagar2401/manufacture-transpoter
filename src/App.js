import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Register";
import SignIn from "./Pages/login";
import { Manufacturer } from "./Pages/Manufacturer";
import { Transporter } from "./Pages/Transporter";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/transporter " element={<Transporter />} />
        <Route exact path="/manufacturer" element={<Manufacturer />} />
      </Routes>
    </Router>
  );
}

export default App;
