import { products, clients } from './mockData';

export default {
  products: () => Object.values(products),
  product: p => products[p.id],

  Product: {
    client: p => clients[p.clientId]
  }
}
