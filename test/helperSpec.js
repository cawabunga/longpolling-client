var helper = require('../src/helper');

describe('assign', function () {

    it('should merge objects', function () {
        var a = {default: 1},
            b = {foo: 2},
            c = {bar: 3};

        helper.assign(a, b, c);
        expect(a).toEqual({default: 1, foo: 2, bar: 3});
    });

    it('should override previous property value', function () {
        var a = {foo: 1},
            b = {foo: 2};

        helper.assign(a, b);
        expect(a.foo).toEqual(2);
    });

    it('should return same object', function () {
      var a = {foo: 1},
          b = {foo: 2};

        var result = helper.assign(a, b);
        expect(a).toBe(result);
    });

});