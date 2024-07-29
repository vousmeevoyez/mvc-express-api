import User from "../models/userModel.mjs";
import userSchema from "../schemas/userSchema.mjs";

const DECIMAL = 10;

// Mendapatkan semua pengguna atau mencari pengguna berdasarkan query
export const getUsers = async (req, res) => {
  const users = await User.getAll();
  return res.json(users);
};

// Mendapatkan pengguna berdasarkan ID
export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (user) {
    return res.json(user);
  }
  return res.status(404).json({ error: "User not found" });
};

// Membuat pengguna baru
export const createUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newUser = await User.create(value);
    return res.status(201).json(newUser);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

// Memperbarui pengguna berdasarkan ID
export const updateUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userId = parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const updatedUser = await User.update(userId, value);
    return res.status(200).json(updatedUser);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

// Menghapus pengguna berdasarkan ID
export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  await User.delete(parseInt(req.params.id, DECIMAL));
  return res.status(204).send();
};
