const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const {icon, source, amount, date} = req.body;

    // Validation: Check for missing fields
    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({message: "Todos los campos son obligatorios"});
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({userId}).sort({date: -1});
    res.json(income);
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({message: "Ingreso eliminado con éxito"});
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({userId}).sort({date: -1});

    // Prepare data for excel
    const data = income.map((item) => ({
      Fuente: item.source,
      Monto: item.amount,
      Fecha: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "ingresos_detalle.xlsx");
    res.download("ingresos_detalle.xlsx");
  } catch (error) {
    res.status(500).json({message: "Error del Servidor"});
  }
};
