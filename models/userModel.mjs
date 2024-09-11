import bcrypt from "bcryptjs";
import db from "../database/knex.mjs";

const saltRounds = 10;

export default class User {
  // Mendapatkan semua pengguna
  static getAll() {
    return db("users").select("*");
  }

  // Mendapatkan pengguna berdasarkan ID
  static getById(id) {
    return db("users").where({ id }).first();
  }

  // Membuat pengguna baru
  static async getByEmailPassword({ email, password, raiseError = true }) {
    const user = await db("users").where({ email }).first();
    if (!user) {
      throw new Error("User email not found");
    }

    if (password) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect && raiseError) {
        throw new Error("Incorrect password");
      }
    }

    return user;
  }

  // Membuat pengguna baru
  static async create({ password, ...data }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [{ id }] = await db("users")
      .insert({
        password: hashedPassword,
        ...data,
      })
      .returning("id");
    return { ...data, id };
  }

  // Memperbarui pengguna berdasarkan ID
  static async update(id, data) {
    const { password, ...otherData } = data;
    const updatedData = { ...otherData };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedData.password = hashedPassword;
    }

    await db("users").where({ id }).update(data);

    return { ...updatedData, id };
  }

  // Menghapus pengguna berdasarkan ID
  static async delete(id) {
    await db("users").where({ id }).del();
  }
}
