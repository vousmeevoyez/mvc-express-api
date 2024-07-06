import Item from "../models/itemModel.mjs";
import itemSchema from "../schemas/itemSchema.mjs";

const DECIMAL = 10;

export const getItems = (req, res) => res.json(Item.getAll());

export const getItemById = (req, res) => {
  const item = Item.getById(parseInt(req.params.id, DECIMAL));
  if (item) {
    return res.json(item);
  }
  return res.status(404).send("Item not found");
};

export const createItem = (req, res) => {
  const { error, value } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newItem = Item.create(value);
  return res.status(201).json(newItem);
};

export const updateItem = (req, res) => {
  const { error, value } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const updatedItem = Item.update(parseInt(req.params.id, DECIMAL), value);
  if (updatedItem) {
    return res.json(updatedItem);
  }
  return res.status(404).send("Item not found");
};

export const deleteItem = (req, res) => {
  const deletedItem = Item.delete(parseInt(req.params.id, DECIMAL));
  if (deletedItem) {
    return res.json(deletedItem);
  }
  return res.status(404).send("Item not found");
};
