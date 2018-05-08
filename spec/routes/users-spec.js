const request = require('request');

const usersApi = request.defaults({
    baseUrl: 'http://localhost:3000/users',
    json: true
});

const loginApi = request.defaults({
    baseUrl: 'http://localhost:3000/login',
    json: true
});

describe('Users API Tests:', () => {

    // Get all users.
    describe("GET / :", () => {

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                usersApi.get({
                    url: '/',
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 403 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'amgarcia',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                usersApi.get({
                    url: '/',
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

    // Get tickets submitted by a user.
    describe("GET /:userId/tickets :", () => {

        const userId = '5aefc78a513d8023e4f5366a';

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                usersApi.get({
                    url: `/${userId}/tickets`,
                    headers: {
                        'Authorization': body
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    done();
                });
            });
        });

        it("Status 403 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'jdoe',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                usersApi.get({
                    url: `/${userId}/tickets`,
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

