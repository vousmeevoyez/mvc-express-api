import db from "../database/knex.mjs";

export default class UserProfile {
  // Membuat pengguna profile baru
  static async create(data) {
    const [{ id }] = await db("user_profiles").insert(data).returning("id");
    return { ...data, id };
  }

  static async update(id, data) {
    await db("user_profiles").where({ user_id: id }).update(data);
    return data;
  }

  // Menghapus pengguna berdasarkan ID
  static async delete(id) {
    await db("user_profiles").where({ id }).del();
  }

  // Mendapatkan pengguna berdasarkan ID
  static getByUserId(userId) {
    return db("user_profiles").where({ user_id: userId }).first();
  }
}
