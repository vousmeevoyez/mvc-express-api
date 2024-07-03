import { User } from '../models/userModel.mjs';
import { userSchema } from '../schemas/userSchema.mjs';

export const getUsers = (req, res) => {
  res.json(User.getAll());
};

export const getUserById = (req, res) => {
  const user = User.getById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

export const createUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newUser = User.create(value);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const updatedUser = User.update(parseInt(req.params.id), value);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
};

export const deleteUser = (req, res) => {
  const deletedUser = User.delete(parseInt(req.params.id));
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
};
