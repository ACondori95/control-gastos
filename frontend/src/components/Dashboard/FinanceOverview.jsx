import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
  const balanceData = [
    {name: "Balance Total", amount: totalBalance},
    {name: "Gastos Totales", amount: totalExpense},
    {name: "Ingresos Totales", amount: totalIncome},
  ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Resumen Financiero</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label='Balance Total'
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
