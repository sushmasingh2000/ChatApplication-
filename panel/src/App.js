import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import Home from "./component/Home";
import Settings from "./component/Setting";

function App() {
  return (
    <Router> {/* Wrap the Routes inside the Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/setting" element={<Settings />} />

      </Routes>
    </Router>
  );
}

export default App;
