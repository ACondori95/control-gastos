import React from "react";
import {LuDownload} from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import "moment/locale/es";

moment.updateLocale("es", {
  monthsShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
});
moment.locale("es");

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Todos los Gastos</h5>

        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Descargar
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("D MMM YYYY")}
            amount={expense.amount}
            type='expense'
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
