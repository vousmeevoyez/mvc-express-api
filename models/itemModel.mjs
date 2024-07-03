let items = [];
let currentId = 1;

export class Item {
  constructor(data) {
    this.id = currentId++;
    this.name = data.name;
    this.price = data.price;
  }

  static getAll() {
    return items;
  }

  static getById(id) {
    return items.find(item => item.id === id);
  }

  static create(data) {
    const newItem = new Item(data);
    items.push(newItem);
    return newItem;
  }

  static update(id, data) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { id, ...data };
      return items[index];
    }
    return null;
  }

  static delete(id) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      return items.splice(index, 1);
    }
    return null;
  }
}
