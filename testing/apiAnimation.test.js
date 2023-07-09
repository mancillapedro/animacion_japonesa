import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);

describe("Test GET route /api/animations", () => {
    it('Retorna código 200', done => {
        chai.request(app).get('/api/animations').end((err, res) => {
            chai.expect(res).status(200);
            done();
        });
    });
    it('Retorna un json', done => {
        chai.request(app).get('/api/animations').end((err, res) => {
            chai.expect(res).have.json;
            done();
        });
    });

});
