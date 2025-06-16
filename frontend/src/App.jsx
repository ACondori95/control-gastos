import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/ingresar' exact element={<Login />} />
            <Route path='/registrarse' exact element={<SignUp />} />
            <Route path='/inicio' exact element={<Home />} />
            <Route path='/ingresos' exact element={<Income />} />
            <Route path='/gastos' exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster toastOptions={{className: "", style: {fontSize: "13px"}}} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to='/inicio' />
  ) : (
    <Navigate to='/ingresar' />
  );
};
