import db from "../database/knex.mjs";

export default class UserProfile {
  // Membuat pengguna profile baru
  static async create(data) {
    const [{ id }] = await db("user_profiles").insert(data).returning("id");
    return { ...data, id };
  }
}
