'use strict';

function assign(target, source) {
    var sources = [].slice.call(arguments, 1),
        keys, key;

    for (var i = 0, ii = sources.length; i < ii; i++) {
        source = sources[i];
        keys = Object.keys(source);

        for (var j = 0, jj = keys.length; j < jj; j++) {
            key = keys[j];
            target[key] = source[key];
        }
    }

    return target;
}

module.exports = {
    assign: assign
};