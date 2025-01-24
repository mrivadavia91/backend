import TicketDAO from '../daos/tickets.dao.js';

class TicketRepository {
  constructor() {
    this.ticketDAO = new TicketDAO();
  }

  async createTicket(ticketData) {
    return await this.ticketDAO.create(ticketData);
  }

  async getTicketById(ticketId) {
    return await this.ticketDAO.getById(ticketId);
  }
}

export default new TicketRepository();
