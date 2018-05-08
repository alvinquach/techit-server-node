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

        const ticketId = '5aefc78a513d8023e4f53670';
        const status = 'OPEN';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${ticketId}/status/${status}`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body.status).toBe(status);
                    done();
                });
            });
        });

        it("Status 403 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'jcota',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${ticketId}/status/${status}`,
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

    // Set the priority of a ticket. 
    describe("PUT //:ticketId/priority/:priority :", () => {

        const ticketId = '5aefc78a513d8023e4f53670';
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
                    url: `/${ticketId}/priority/${priority}`,
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

        it("Status 403 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'jcota',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                ticketsApi.put({
                    url: `/${ticketId}/priority/${priority}`,
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