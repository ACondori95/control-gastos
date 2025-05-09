import React, {useEffect, useState} from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import {useUserAuth} from "../../hooks/useUserAuth";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";

const Inicio = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Algo salió mal. Por favor, intentá de nuevo.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu='Inicio'>
      <div className='my-5 mx-auto'>Inicio</div>
    </DashboardLayout>
  );
};

export default Inicio;
