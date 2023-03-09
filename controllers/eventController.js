const fs = require("fs");
const eventsPath = "./database/events.json";
const ticketsPath = "./database/tickets.json";

exports.list = ((req, res) => {
    const eventContent = fs.readFileSync(eventsPath,"utf8");
    const ticketsContent = fs.readFileSync(ticketsPath,"utf8");
    const events = JSON.parse(eventContent);
    const tickets = JSON.parse(ticketsContent);

    events.forEach((event) => {
        const eventTickets = tickets.filter(t => t.eventId === event.id)
        event.ticketsCount = eventTickets.length
        event.validateTickets = eventTickets.filter(t => t.isValidated === 1).length
        event.nonValidateTickets = event.ticketsCount - event.validateTickets
    })
    res.send(events);
})
