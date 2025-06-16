const Expense = require("../models/Expense");
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

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({userId}).sort({date: -1});
    res.json(expense);
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({message: "Gasto eliminado con éxito"});
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({userId}).sort({date: -1});

    // Prepare data for excel
    const data = expense.map((item) => ({
      Categoría: item.category,
      Monto: item.amount,
      Fecha: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "gastos_detalle.xlsx");
    res.download("gastos_detalle.xlsx");
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};
