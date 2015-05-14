define([], function () {
    var Class = function () {

    };

    Class.prototype = Object.create(Object.prototype, {});

    var instance = new Class();

    return instance;
});