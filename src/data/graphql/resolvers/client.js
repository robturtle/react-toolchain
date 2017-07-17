import { clients } from './mockData';

export default {
  clients: () => Object.values(clients),
  client: c => clients[c.id],
};
