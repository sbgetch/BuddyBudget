import budgetPlanModel from "../models/budgetPlanModel.js";

const BudgetPlanController = {
  list: async (req, res) => {
    try {
      const { userId, isDeleted } = req.query;
      let records;

      if (userId) {
        records = await budgetPlanModel
          .find({ $and: [{ userId }, { isDeleted }] })
          .populate({
            path: "budgetsId",
            model: "Budget",
            select: "source amount",
          })
          .populate({
            path: "expensesId",
            model: "Expense",
            select: "category amount",
          });
      } else {
        records = await budgetPlanModel.find();
      }

      res.status(200).send(records);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newRecord = new budgetPlanModel(req.body);
      const savedRecord = await newRecord.save();

      res.status(201).send(savedRecord);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  read: async (req, res) => {
    try {
      const id = req.params.id;
      const record = await budgetPlanModel
        .findById(id)
        .populate({
          path: "budgetsId",
          model: "Budget",
          select: "source amount",
        })
        .populate({
          path: "expensesId",
          model: "Expense",
          select: "category amount",
        });

      res.status(200).send(record);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const newRecord = req.body;
      const updatedRecord = await budgetPlanModel
        .findByIdAndUpdate(id, newRecord, {
          new: true,
        })
        .populate({
          path: "budgetsId",
          model: "Budget",
          select: "source amount",
        })
        .populate({
          path: "expensesId",
          model: "Expense",
          select: "category amount",
        });

      if (!updatedRecord) {
        return res.status(404).send({ message: "Budget Plan not found!" });
      }

      res.status(201).send(updatedRecord);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRecord = await budgetPlanModel.findById(id);

      if (!deletedRecord) {
        return res.status(404).send({ message: "Budget Plan not found!" });
      }

      await deletedRecord.softDelete();

      res
        .status(200)
        .send({ message: "Successfully deleted", data: deletedRecord });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};

export default BudgetPlanController;
