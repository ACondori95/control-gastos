import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Ingresar from "./pages/Auth/Ingresar";
import Registrarse from "./pages/Auth/Registrarse";
import Inicio from "./pages/Dashboard/Inicio";
import Ingresos from "./pages/Dashboard/Ingresos";
import Gastos from "./pages/Dashboard/Gastos";
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/ingresar' exact element={<Ingresar />} />
            <Route path='/registrarse' exact element={<Registrarse />} />
            <Route path='/inicio' exact element={<Inicio />} />
            <Route path='/ingresos' exact element={<Ingresos />} />
            <Route path='/gastos' exact element={<Gastos />} />
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
