const users = [];
const currentId = 1;

export default class User {
  constructor(data) {
    this.id = currentId + 1;
    this.firstName = data.firstName;
    if (data.lastName) {
      this.lastName = data.lastName;
    }
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
  }

  // Mendapatkan semua pengguna
  static getAll() {
    return users;
  }

  // Mendapatkan pengguna berdasarkan ID
  static getById(id) {
    return users.find((user) => user.id === id);
  }

  // Membuat pengguna baru
  static create(data) {
    const newUser = new User(data);
    users.push(newUser);
    return newUser;
  }

  // Memperbarui pengguna berdasarkan ID
  static update(id, data) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { id, ...data };
      return users[index];
    }
    return null;
  }

  // Menghapus pengguna berdasarkan ID
  static delete(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1);
    }
    return null;
  }

  // Memeriksa apakah pengguna dengan ID tertentu sudah ada
  static exists(id) {
    return users.some((user) => user.id === id);
  }

  // Mencari pengguna berdasarkan query (nama depan, nama belakang, email, atau nomor telepon)
  static search(query) {
    const lowerCaseQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseQuery) ||
        (user.lastName &&
          user.lastName.toLowerCase().includes(lowerCaseQuery)) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phoneNumber.includes(query),
    );
  }
}
