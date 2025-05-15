const Ingreso = require("../models/Ingreso");
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

    const parts = date.split("/");
    if (parts.length !== 3) {
      return res.status(400).json({message: "Formato de date inválido"});
    }
    const [day, month, year] = parts.map((p) => parseInt(p, 10));
    const dateParsed = new Date(year, month - 1, day); // mes-1 porque en JS enero=0
    if (isNaN(dateParsed)) {
      return res.status(400).json({message: "date inválida"});
    }

    const newIncome = new Ingreso({
      userId,
      icon,
      source,
      amount,
      date: dateParsed,
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Ingreso.find({userId}).sort({date: -1});
    res.json(income);
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Ingreso.findByIdAndDelete(req.params.id);
    res.json({message: "Ingreso eliminado con éxito"});
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Ingreso.find({userId}).sort({date: -1});

    // Prepare data for excel
    const data = income.map((item) => ({
      Fuente: item.source,
      Importe: item.amount,
      Fecha: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Ingresos");
    xlsx.writeFile(wb, "ingresos_detalle.xlsx");
    res.download("ingresos_detalle.xlsx");
  } catch (error) {
    res.status(500).json({message: "Error del servidor"});
  }
};
