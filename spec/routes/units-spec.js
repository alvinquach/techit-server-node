const request = require('request');

const unitsApi = request.defaults({
    baseUrl: 'http://localhost:3000/units',
    json: true
});

const loginApi = request.defaults({
    baseUrl: 'http://localhost:3000/login',
    json: true
});

describe('Units API Tests:', () => {

    // Get technicians of a unit.
    describe("GET /:unitId/technicians :", () => {

        const unitId = '5aefc78a513d8023e4f53666';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                unitsApi.get({
                    url: `/${unitId}/technicians`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 403 expected due to insufficient permissions", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'amgarcia',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                unitsApi.get({
                    url: `/${unitId}/technicians`,
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

    // Get tickets submitted to a unit.
    describe("GET /:unitId/tickets :", () => {

        const unitId = '5aefc78a513d8023e4f53666';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                unitsApi.get({
                    url: `/${unitId}/tickets`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 403 expected due to insufficient permissions", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'amgarcia',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                unitsApi.get({
                    url: `/${unitId}/tickets`,
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