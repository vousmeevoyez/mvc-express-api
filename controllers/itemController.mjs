import { Item } from '../models/itemModel.mjs';
import { itemSchema } from '../schemas/itemSchema.mjs';

export const getItems = (req, res) => {
  res.json(Item.getAll());
};

export const getItemById = (req, res) => {
  const item = Item.getById(parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
};

export const createItem = (req, res) => {
  const { error, value } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newItem = Item.create(value);
  res.status(201).json(newItem);
};

export const updateItem = (req, res) => {
  const { error, value } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const updatedItem = Item.update(parseInt(req.params.id), value);
  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
};

export const deleteItem = (req, res) => {
  const deletedItem = Item.delete(parseInt(req.params.id));
  if (deletedItem) {
    res.json(deletedItem);
  } else {
    res.status(404).send('Item not found');
  }
};
