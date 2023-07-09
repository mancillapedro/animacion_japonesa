import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);

describe("Test GET route /animations", () => {
    it('Retorna código 200', done => {
        chai.request(app).get('/animations').end((err, res) => {
            chai.expect(res).status(200);
            chai.expect(res).have.html;
            done();
        });
    });
    it('Muestra un html', done => {
        chai.request(app).get('/animations').end((err, res) => {
            chai.expect(res).have.html;
            done();
        });
    });
});

describe("Test GET route /animations?format=json", () => {
    it('Retorna código 200', done => {
        chai.request(app).get('/animations?format=json').end((err, res) => {
            chai.expect(res).status(200);
            done();
        });
    });
    it('Muestra un json', done => {
        chai.request(app).get('/animations?format=json').end((err, res) => {
            chai.expect(res).have.json;
            done();
        });
    });


});
