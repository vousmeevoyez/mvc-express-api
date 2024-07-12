import User from "../models/userModel.mjs";
import userSchema from "../schemas/userSchema.mjs";

const DECIMAL = 10;

// Mendapatkan semua pengguna atau mencari pengguna berdasarkan query
export const getUsers = (req, res) => {
  const { text } = req.query;
  if (text) {
    const users = User.search(text);
    return res.json(users);
  }
  return res.json(User.getAll());
};

// Mendapatkan pengguna berdasarkan ID
export const getUserById = (req, res) => {
  const user = User.getById(parseInt(req.params.id, DECIMAL));
  if (user) {
    return res.json(user);
  }
  return res.status(404).send("User not found");
};

// Membuat pengguna baru
export const createUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newUser = User.create(value);
  return res.status(201).json(newUser);
};

// Memperbarui pengguna berdasarkan ID
export const updateUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const updatedUser = User.update(parseInt(req.params.id, DECIMAL), value);
  if (updatedUser) {
    return res.json(updatedUser);
  }
  return res.status(404).send("User not found");
};

// Menghapus pengguna berdasarkan ID
export const deleteUser = (req, res) => {
  const deletedUser = User.delete(parseInt(req.params.id, DECIMAL));
  if (deletedUser) {
    return res.json(deletedUser);
  }
  return res.status(404).send("User not found");
};
