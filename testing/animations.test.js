import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);

describe("Test GET route /animations", () => {
    it('Retorna código 200', done => {
        chai.request(app).get('/animations').end((err, res) => {
            chai.expect(res).status(200);
            done();
        });
    });
    it('Retorna un html', done => {
        chai.request(app).get('/animations').end((err, res) => {
            chai.expect(res).have.html;
            done();
        });
    });
});
