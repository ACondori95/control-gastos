import React, {useState} from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({onAddIncome}) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({...income, [key]: value});

  const handleDateChange = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
        4
      )}`;
    }
    handleChange("date", formatted);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({target}) => handleChange("source", target.value)}
        label='Fuente de Ingresos'
        placeholder='Freelance, Sueldo, etc.'
        type='text'
      />

      <Input
        value={income.amount}
        onChange={({target}) => handleChange("amount", target.value)}
        label='Monto'
        placeholder=''
        type='number'
      />

      <Input
        value={income.date}
        onChange={({target}) => handleDateChange(target.value)}
        label='Fecha'
        placeholder='dd/mm/yyyy'
        type='text'
        inputMode='numeric'
        pattern='\d{2}/\d{2}/\d{4}'
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={() => onAddIncome(income)}>
          Agregar Ingreso
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
