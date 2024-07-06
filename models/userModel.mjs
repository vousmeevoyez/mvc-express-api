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

  static getAll() {
    return users;
  }

  static getById(id) {
    return users.find((user) => user.id === id);
  }

  static create(data) {
    const newUser = new User(data);
    users.push(newUser);
    return newUser;
  }

  static update(id, data) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { id, ...data };
      return users[index];
    }
    return null;
  }

  static delete(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1);
    }
    return null;
  }
}
