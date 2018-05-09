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

    const testTicketId = '5aefc78a513d8023e4f53670';
    let testTicketStatus;
    let testTicketPriority;

    // Find out the current status and priority of the test ticket.
    beforeAll((done) => {
        loginApi.post({
            url: '/',
            qs: {
                username: 'techit',
                password: 'abcd'
            }
        }, (err, res, body) => {
            ticketsApi.get({
                url: `/${testTicketId}`,
                headers: {
                    'Authorization': body
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                testTicketStatus = body.status;
                testTicketPriority = body.priority;
                done();
            });
        });
    });

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
                    done();
                });
            });
        });

        it("Status 400 expected due to missing subject", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {

                const ticket = {
                    priority: 'MEDIUM',
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
                    expect(res.statusCode).toBe(400);
                    done();
                });
            });
        });
    });

    // Get the technicians assigned to a ticket.
    describe("GET /:ticketId/technicians :", () => {

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.get({
                    url: `/${testTicketId}/technicians`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 404 expected due to invalid ticket ID", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.get({
                    url: '/invalid_ticket_id/technicians',
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(404);
                    done();
                });
            });
        });
        
    });

    // Set the status of a ticket. 
    describe("PUT //:ticketId/status/:status :", () => {

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {

                const newStatus = testTicketStatus == 'OPEN' ? 'IN_PROGRESS' : 'OPEN';

                ticketsApi.put({
                    url: `/${testTicketId}/status/${newStatus}`,
                    headers: {
                        'Authorization': body
                    },
                    body: {
                        description: "For testing."
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.status).toBe(newStatus);
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
                    url: `/${testTicketId}/status/${testTicketStatus}`,
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

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {

                const newPriority = testTicketPriority == 'NOT_ASSIGNED' ? 'LOW' : 'NOT_ASSIGNED';

                ticketsApi.put({
                    url: `/${testTicketId}/priority/${newPriority}`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.priority).toBe(newPriority);
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
                    url: `/${testTicketId}/priority/${testTicketPriority}`,
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