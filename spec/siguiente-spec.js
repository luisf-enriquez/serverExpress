// archivo con el codigo para la prueba unitaria con jasmine
const app = require('../siguiente');

describe('siguiente', function() { // el describe recibe dos parametros, el modulo a probar y una funcion
    // con el it se establece la descripcion del modulo de prueba
    it('El siguiente de 3 es 4', function(){
        // value almacena el resultado de la funcion siguiente
        // mientras que la expresion expect(ValorObtenido).toBe(valorEsperado)
        let value = app.siguiente(3);
        expect(value).toBe(4);
    });

    // it('El siguiente de -2 es -1', function(){
    //     expect(app.siguiente(-2)).toBe(-1);
    // });
});

describe('add', function(){
    it('La suma de 3 + 4 debe ser 7', function(){
        expect(app.add(3,4)).toBe(7);
    })
});

