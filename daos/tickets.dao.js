import Ticket from '../models/Ticket.js';

export default class TicketDAO {
  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getById(ticketId) {
    return await Ticket.findById(ticketId);
  }
}
