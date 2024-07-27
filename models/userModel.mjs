import bcrypt from "bcrypt";
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
  static update(id, data) {
    return db("users").where({ id }).update(data);
  }

  // Menghapus pengguna berdasarkan ID
  static delete(id) {
    return db("users").where({ id }).del();
  }
}
