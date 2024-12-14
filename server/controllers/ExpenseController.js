import expenseModel from "../models/expenseModel.js";

const ExpenseController = {
  list: async (req, res) => {
    try {
      const records = await expenseModel.find();
      res.status(200).send(records);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  // listByBudgetPlan: async (req, res) => {
  //   try {
  //     const { budgetPlanId } = req.params;

  //     const records = await expenseModel
  //       .find({ budgetPlanId })
  //       .populate("budgetPlanId", "_id");

  //     res.status(200).send(records);
  //   } catch (error) {
  //     res.status(400).send({ message: error.message });
  //   }
  // },
  create: async (req, res) => {
    try {
      const newRecord = new expenseModel(req.body);
      const savedRecord = await newRecord.save();

      res.status(201).send(savedRecord);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  read: async (req, res) => {
    try {
      const id = req.params.id;
      const record = await expenseModel.findById(id);

      res.status(200).send(record);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const newRecord = req.body;
      const updatedRecord = await expenseModel.findByIdAndUpdate(
        id,
        newRecord,
        {
          new: true,
        }
      );

      if (!updatedRecord) {
        return res.status(404).send({ message: "Item not found!" });
      }

      res.status(201).send({ message: "Expense updated successfully!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRecord = await expenseModel.findByIdAndDelete(id);

      if (!deletedRecord) {
        return res.status(404).send({ message: "Item not found!" });
      }

      res
        .status(200)
        .send({ message: "Successfully deleted", data: deletedRecord });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};

export default ExpenseController;
