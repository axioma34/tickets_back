const fs = require("fs");
const ticketsPath = "./database/tickets.json";
const eventsPath = "./database/events.json";

exports.validate = ((req, res) => {
    if (!req.body) return res.sendStatus(400);

    const validationCode = req.body.validationCode;
    const eventId = req.body.eventId;

    let data = fs.readFileSync(ticketsPath, "utf8");
    const tickets = JSON.parse(data);
    const ticket = tickets.find(t => t.validationCode === validationCode && t.eventId === eventId)

    if (ticket && !ticket.isValidated) {
        ticket.isValidated = 1;
        data = JSON.stringify(tickets);
        fs.writeFileSync(ticketsPath, data);
        res.send(ticket);
    } else if (!ticket) {
        res.status(404).send('Ticket not found!');
    } else {
        res.status(409).send('Ticket already validated!');
    }
})

exports.create = ((req, res) => {
    if (!req.body) return res.sendStatus(400);

    const eventId = req.body.eventId
    const validationCode = req.body.validationCode

    if (typeof validationCode !== 'number') { return res.status(409).send("Validation code not valid!") }

    const eventsData = fs.readFileSync(eventsPath, "utf8")
    const events = JSON.parse(eventsData)

    const ticketsData = fs.readFileSync(ticketsPath, "utf8")
    const tickets = JSON.parse(ticketsData)

    const event = events.find(e => e.id === eventId)
    if (!event) { return res.status(404).send("Event not found") }

    const ticketExists = tickets.find(t => t.validationCode === validationCode)
    if (ticketExists) { return res.status(409).send("Ticket with this code already exists") }

    const id = Math.max(...tickets.map(t => t.id))
    const ticket = {
        id: id + 1,
        validationCode,
        isValidated: 0,
        eventId
    }

    tickets.push(ticket)
    const data = JSON.stringify(tickets)
    fs.writeFileSync(ticketsPath, data)
    res.send(ticket)
})
