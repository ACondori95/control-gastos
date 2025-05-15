import React from "react";
import {LuArrowRight} from "react-icons/lu";
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

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Ingresos</h5>

        <button className='card-btn' onClick={onSeeMore}>
          Ver Todo <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("D MMM YYYY")}
            amount={item.amount}
            type='income'
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
