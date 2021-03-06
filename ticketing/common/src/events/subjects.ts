/**
 * The channel name of NATS
 */
export enum Subjects {
    TicketCreated = 'ticket:created',
    TicketUpdated = 'ticket:updated',
    OrderCreated = 'order:created',
    OrderCancelled = 'order:cancelled',
}
