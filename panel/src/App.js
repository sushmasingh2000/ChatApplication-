import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import Home from "./component/Home";
import Settings from "./component/Setting";
import AddContact from "./component/contact/AddContact";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/contact" element={<AddContact />} />

      </Routes>
    </Router>
  );
}

export default App;
