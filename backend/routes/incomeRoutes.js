const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {
  addIncome,
  getAllIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeControllers");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
