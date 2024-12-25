import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import Home from "./component/Home";
import Settings from "./component/Setting/Setting";
import AddContact from "./component/contact/AddContact";
import Status from "./component/Setting/Status";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/contact" element={<AddContact />} />
        <Route path="/status" element={<Status />} />

      </Routes>
    </Router>
  );
}

export default App;
