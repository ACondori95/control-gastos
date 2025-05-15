const Gasto = require("../models/Gasto");
const xlsx = require("xlsx");

// Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const {icon, category, amount, date} = req.body;

    // Validation: Check for missing fields
    if (!category || !amount || !date) {
      return res
        .status(400)
        .json({message: "Todos los campos son obligatorios"});
    }

    const parts = date.split("/");
    if (parts.length !== 3) {
      return res.status(400).json({message: "Formato de fecha inválido"});
    }
    const [day, month, year] = parts.map((p) => parseInt(p, 10));
    const dateParsed = new Date(year, month - 1, day); // mes-1 porque en JS enero=0
    if (isNaN(dateParsed)) {
      return res.status(400).json({message: "Fecha inválida"});
    }

    const newExpense = new Gasto({
      userId,
      icon,
      category,
      amount,
      date: dateParsed,
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Gasto.find({userId}).sort({date: -1});
    res.json(expense);
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  try {
    await Gasto.findByIdAndDelete(req.params.id);
    res.json({message: "Gasto eliminado con éxito"});
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Gasto.find({userId}).sort({date: -1});

    // Prepare data for excel
    const data = expense.map((item) => ({
      Categoría: item.category,
      Importe: item.amount,
      Fecha: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Gastos");
    xlsx.writeFile(wb, "gastos_detalle.xlsx");
    res.download("gastos_detalle.xlsx");
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};
