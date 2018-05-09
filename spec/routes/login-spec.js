const request = require('request');
const authentication = require('../../authentication/authentication');

const loginApi = request.defaults({
    baseUrl: 'http://localhost:3000/login',
    json: true
});

describe('Login API Tests:', () => {

    describe("POST / :", () => {

        it("Status 200 expected", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'abcd'
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body.startsWith("Bearer ")).toBe(true);
                done();
            });
        });

        it("Status 401 expected due to wrong password", (done) => {
            loginApi.post({
                url: '/',
                qs: {
                    username: 'techit',
                    password: 'wrong password'
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(401);
                done();
            });
        });

    });

});