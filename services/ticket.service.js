import TicketModel from '../models/Ticket.js';

export default class TicketService {
    async createTicket(ticketData) {
        try {
            const ticket = new TicketModel({
                code: this.generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: ticketData.amount,
                purchaser: ticketData.purchaser,
            });
            return await ticket.save();
        } catch (error) {
            throw new Error(`Error creating ticket: ${error.message}`);
        }
    }

    generateUniqueCode() {
        // Genera un código único usando la fecha y un identificador aleatorio
        const timestamp = Date.now().toString(36); // Fecha en base 36
        const random = Math.random().toString(36).substring(2, 8); // Random alfanumérico
        return `${timestamp}-${random}`.toUpperCase();
    }
}
