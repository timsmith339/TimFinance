module.exports = function (app) {

    require('./categories')(app);
    require('./accounts')(app);

};