import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);

describe("Test GET route /api/animations", () => {
    it('Retorna json y código 200',
        done => chai.request(app).get('/api/animations').end((_, res) => {
            chai.expect(res).have.json;
            chai.expect(res).status(200);
            done();
        })
    )
});

describe("Test GET route /api/animations/id/:id", () => {

    describe("se encuentra el id", () => {
        const
            id = 2,
            pathRoute = `/api/animations/id/${id}`

        it('Retorna json y código 200 ',
            done => chai.request(app).get(pathRoute).end((err, res) => {
                chai.expect(res).have.json;
                chai.expect(res).status(200);
                done();
            })
        )

        it('Retorna propiedades nombre, genero, año y autor',
            done => chai.request(app).get(pathRoute).end((_, res) => {
                const properties = ['nombre', 'genero', 'año', 'autor']
                properties.forEach(attr => chai.expect(res.body).to.have.property(attr))
                done();
            })
        )
    })

    describe("no se encuentra el id", () => {
        const
            id = '!-!-!-!-!-!-!-!-!-!-!-!-!-!-!',
            pathRoute = `/api/animations/id/${id}`

        it('Retorna json y código 404',
            done => chai.request(app).get(pathRoute).end((_, res) => {
                chai.expect(res).have.json;
                chai.expect(res).status(404);
                done();
            })
        )

        it('Retorna propiedad errors',
            done => chai.request(app).get(pathRoute).end((_, res) => {
                chai.expect(res.body).to.have.property('errors');
                done();
            })
        )
    })

})

