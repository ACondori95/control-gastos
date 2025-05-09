import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import {useUserAuth} from "../../hooks/useUserAuth";

const Inicio = () => {
  useUserAuth();

  return (
    <DashboardLayout activeMenu='Inicio'>
      <div className='my-5 mx-auto'>Inicio</div>
    </DashboardLayout>
  );
};

export default Inicio;
