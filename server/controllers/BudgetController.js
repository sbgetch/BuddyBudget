import budgetModel from "../models/budgetModel.js";

const BudgetController = {
  list: async (req, res) => {
    try {
      const records = await budgetModel.find();
      res.status(200).send(records);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  // listByBudgetPlan: async (req, res) => {
  //   try {
  //     const { budgetPlanId } = req.params;

  //     const records = await budgetModel
  //       .find({ budgetPlanId })
  //       .populate("budgetPlanId", "_id");

  //     res.status(200).send(records);
  //   } catch (error) {
  //     res.status(400).send({ message: error.message });
  //   }
  // },
  create: async (req, res) => {
    try {
      const newRecord = new budgetModel(req.body);
      const savedRecord = await newRecord.save();

      res.status(201).send(savedRecord);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  read: async (req, res) => {
    try {
      const id = req.params.id;
      const record = await budgetModel.findById(id);

      res.status(200).send(record);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const newRecord = req.body;
      const updatedRecord = await budgetModel.findByIdAndUpdate(id, newRecord, {
        new: true,
      });

      if (!updatedRecord) {
        return res.status(404).send({ message: "Item not found!" });
      }

      res.status(201).send({ message: "Budget updated successfully!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRecord = await budgetModel.findByIdAndDelete(id);

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

export default BudgetController;
