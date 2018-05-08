const request = require('request');

const ticketsApi = request.defaults({
    baseUrl: 'http://localhost:3000/tickets',
    json: true
});

const loginApi = request.defaults({
    baseUrl: 'http://localhost:3000/login',
    json: true
});

describe('Tickets API Tests:', () => {

    let newTicketId;

    // Create new ticket
    describe("POST / :", () => {

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {

                const ticket = {
                    priority: 'MEDIUM',
                    subject: 'asdf',
                    details: 'abcd',
                    location: 'Mars',
                    unit: '5aefc78a513d8023e4f53666'
                };

                ticketsApi.post({
                    url: '/',
                    headers: {
                        'Authorization': body
                    },
                    body: ticket
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.priority).toBe(ticket.priority);
                    expect(body.subject).toBe(ticket.subject);
                    expect(body.details).toBe(ticket.details);
                    expect(body.location).toBe(ticket.location);
                    expect(body.unit).toBe(ticket.unit);
                    newTicketId = body._id;
                    done();
                });
            });
        });

        it("Status 401 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {

                const ticket = {
                    priority: 'MEDIUM',
                    subject: 'asdf',
                    details: 'abcd',
                    location: 'Mars',
                    unit: '5aefc78a513d8023e4f53666'
                };

                ticketsApi.post({
                    url: '/',
                    body: ticket
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(401);
                    done();
                });
            });
        });
    });

    // Get the technicians assigned to a ticket.
    describe("GET /:ticketId/technicians :", () => {

        const ticketId = '5aefc78a513d8023e4f53670';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.get({
                    url: `/${ticketId}/technicians`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 401 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.get({
                    url: `/${ticketId}/technicians`
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(401);
                    done();
                });
            });
        });
        
    });

    // Set the status of a ticket. 
    describe("PUT //:ticketId/status/:status :", () => {

        const status = 'IN_PROGRESS';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${newTicketId}/status/${status}`,
                    headers: {
                        'Authorization': body
                    },
                    body: {
                        description: "For testing."
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.status).toBe(status);
                    done();
                });
            });
        });

        it("Status 400 expected due to assigning same status", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${newTicketId}/status/${status}`,
                    headers: {
                        'Authorization': body
                    },
                    body: {
                        description: "For testing."
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(400);
                    done();
                });
            });
        });

        it("Status 400 expected due to missing description", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${newTicketId}/status/${status}`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(400);
                    done();
                });
            });
        });

    });

    // Set the priority of a ticket. 
    describe("PUT //:ticketId/priority/:priority :", () => {

        const priority = 'LOW';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${newTicketId}/priority/${priority}`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.priority).toBe(priority);
                    done();
                });
            });
        });

        it("Status 403 expected due to insufficient permissions", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'jcota',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${newTicketId}/priority/${priority}`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(403);
                    done();
                });
            });
        });

    });

});