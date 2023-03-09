# tickets_back    
Server side for ticket application
## Start
To start server on ```http://localhost:3000``` use ```node app.js``` inside project folder
## Additional info
Project data stored in two files ```events.json``` and ```tickets.json``` in "database" directory
There are three server methods implemented:
* ```GET http://localhost:3000/event``` - returns all events with it's ticket info
* ```PUT http://localhost:3000/ticket BODY: { validationCode: string, eventId: number }``` - changes validate status if ticket found and it is not validated yet
* ```POST http://localhost:3000/ticket BODY: { validationCode: string, eventId: number }``` - creates new ticket on specified event with specified validation code
* To start client side please go to https://github.com/axioma34/tickets_front#start
