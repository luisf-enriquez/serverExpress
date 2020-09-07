const request = require('supertest'); // llamadas a nuestra propia API
const app = require('../app');
const bcrypt = require('bcrypt');
const expect = require('chai').expect;
const Usuarios = require('../schemas/usuario');

describe('ususarios', function() {

    before(function (done) {
      request(app)
        .get("/pruebas/get-token")
        .end(function (err, res) {
          var result = JSON.parse(res.text);
          token = result.token;
          done();
        });
    });

    beforeEach((done) => {
      //Before each test we empty the database
      Usuarios.remove({}, (err) => {
        done();
      });
    });

    describe('GET', function(){
        it('Should get all the users and return a json response', function(done){
            request(app).get('/pruebas/usuarios')
                .set('token', token)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(200);
                    expect(res.body.data).to.be.a('object').that.includes.all.keys('users', 'total');
                    expect(res.body.data.users).to.have.lengthOf(0);
                    done();
                });
        });

        it('should not be able to consume the route /usuarios since no token was sent', function(done) {
            request(app)
              .get('/pruebas/usuarios')
              .expect('Content-Type', /json/)
              .end((err, res) => {
                expect(401);
                expect(res.body.data).to.be.a('object').that.include.keys('error');
                expect(res.body.data.error).to.have.property('message');
                expect(res.body.data.error).to.have.property('name').that.is.equal('JsonWebTokenError');
                done();
              });
              
        });

        it('it should GET a user by the given id', function(done){
            let user = new Usuarios({
                nombre: "Luis Globant",
                email: "luis@globant.com",
                password: bcrypt.hashSync('123456', 10),
                google: false
            });
            user.save((err, user) => {
                request(app).get('/pruebas/usuarios/' + user._id)
                    .set('token', token)
                    .send(user)
                    .end((err, res) => {
                        expect(200);
                        expect(res.body).to.be.a("object").and.to.have.property('data');
                        expect(res.body.data).to.have.property('user').that.includes.
                            keys('role', 'estado', 'google', 'nombre', '_id', 'email');
                        done();
                    })
            })
        });
    });

    describe('POST', function(){
        it('It should not POST a user without email field', function(done){
    
            let user = {
                nombre: 'Luis',
                password: '123456',
                google: false
            }
    
            request(app).post('/pruebas/usuarios')
                .send(user)
                .set('token', token)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.include.keys('message', 'path');
                    done();
                })
        });

        it('it should POST a user', function(done){
            let user = {
                nombre: 'Luis',
                email: 'luis.enriquez@gmail.com',
                password: '123456',
                google: false
            }

            request(app).post('/pruebas/usuarios')
                .send(user)
                .set('token', token)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(201);
                    expect(res.body).to.be.a('object').and.to.have.property('data');
                    expect(res.body).to.have.property('message').that.is.equal('Registro creado exitosamente');
                    expect(res.body.data).to.have.property('user').that.include.keys('role', 'estado', 'google', '_id', 'nombre', 'email');
                    done();
                });
        })
    });

    describe('PUT', function(){
        it('it should UPDATE a user given the id', function(done){
            let user = new Usuarios({
                nombre: "Luis Globant",
                email: "luis@globant.com",
                password: bcrypt.hashSync('123456', 10),
                google: false
            });

            let updateData = {
                nombre: "Juan",
                email: "juan@globant.com",
                role: "ADMIN_ROLE"
            };
            
            user.save((err, user) => {
                request(app).put('/pruebas/usuarios/' + user._id)
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .send(updateData)
                    .end((err, res) => {
                        expect(200);
                        expect(res.body).to.be.a('object').that.include.keys('status', 'data', 'message');
                        expect(res.body.message).to.be.equal('Documento Actualizado con exito');
                        expect(res.body.data).to.include.keys('role', 'estado', 'google', '_id', 'nombre', 'email');
                        expect(res.body.data.nombre).to.be.equal('Juan');
                        expect(res.body.data.role).to.be.equal('ADMIN_ROLE');
                        done();
                    })
                })
        })
    });

    describe('DELETE', function(){
        it('it should DELETE a user given the id', function(done){
            let user = new Usuarios({
                nombre: "Luis Globant",
                email: "luis@globant.com",
                password: bcrypt.hashSync('123456', 10),
                google: false
            });
            user.save((err, user) => {
                request(app).delete('/pruebas/usuarios/' + user._id)
                    .set('token', token)
                    .send(user)
                    .end((err, res) => {
                        expect(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('status', 'data', 'message');
                        expect(res.body.message).to.be.equal('Documento eliminado');
                        expect(res.body.data).to.have.property('user');
                        expect(res.body.data.user).to.have.property('_id').that.is.equal(String(user._id));
                        done();
                    });
            });
        });
    });
});

// TODO: falta chequear el login para saber el rol del usuario

describe("Login", function () {
    before(function(done){
        Usuarios.create({
            nombre: "Luis Globant",
            email: "luis.Enriquez@globant.com",
            password: bcrypt.hashSync('123456', 10),
            google: false
        }).then(() => done());
    });

    after(function(done) {
        // runs after all tests in this block
        Usuarios.remove({}, (err) => {
            done();
        });
    });

    it("Should success if credential is valid", function (done) {
        request(app)
            .post("/login/api/v1/login")
            .set("Content-Type", "application/json")
            .send({ email: "luis.Enriquez@globant.com", password: "123456" })
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                expect(200);
                expect(res.body).to.be.a("object");
                expect(res.body.data).to.includes.keys('user', 'token');
                done();
            });
        });
});
