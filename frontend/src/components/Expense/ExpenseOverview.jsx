import React, {useEffect, useState} from "react";
import {prepareExpenseLineChartData} from "../../utils/helper";
import {LuPlus} from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Resumen de Gastos</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Seguí las tendencias de tus gastos a lo largo del tiempo y obtené
            información sobre adónde va tu dinero.
          </p>
        </div>

        <button className='add-btn' onClick={onExpenseIncome}>
          <LuPlus className='text-lg' /> Añadir Gasto
        </button>
      </div>

      <div className='mt-10'>
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
