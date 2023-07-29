import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Homepage from "./component/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/signUp" element={<SignUp />}></Route>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
