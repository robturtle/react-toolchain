let clients = null;
let products = null;

class Product {
  constructor({ id, name, price, clientId }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.clientId = clientId;
  }

  client() {
    return clients[this.clientId];
  }
}

class Client {
  constructor({ id, name, age, productIds }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.productIds = productIds;
  }

  products() {
    return this.productIds.map(id => products[id]);
  }
}

products = {
  1: new Product({
    id: 1,
    name: 'react-toolchain',
    price: 0,
    clientId: 2,
  }),
  2: new Product({
    id: 2,
    name: 'Running Man',
    price: 30000000,
    clientId: 1,
  }),
  3: new Product({
    id: 3,
    name: 'Graphql API',
    price: 1700,
    clientId: 1,
  }),
};

clients = {
  1: new Client({
    id: 1,
    name: 'Yang Liu',
    age: 26,
    productIds: [
      1,
      3,
    ],
  }),
  2: new Client({
    id: 2,
    name: 'Angela Bady',
    age: 42,
    productIds: [2],
  })
};

export {
  products,
  clients,
}
