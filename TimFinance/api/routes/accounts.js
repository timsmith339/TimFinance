module.exports = function (app) {

    // Register database models

    require('../models/')(app);
    var HttpStatus = require('http-status-codes');

    var bodyParser = require('body-parser')
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));

    app.get('/api/accounts', function (req, res) {
        req.models.account.find({}, function (err, accounts) {
            res.json(accounts);
        });
    });

    app.get('/api/accounts/:id', function (req, res) {
        var id = req.params.id;
        req.models.account.get(id, function (err, account) {
            res.json(account);
        });
    });

    app.post('/api/accounts', function (req, res) {
        var name = req.body.name;
        if (name == null || name.length == 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                error: "Missing Name."
            });
        } else {
            req.models.account.create({
                Name: name
            }, function (err, items) {
                if (err)
                    res.status(HttpStatus.BAD_REQUEST).send({
                        error: err.message
                    });
                else
                    res.json(items);
            });
        }
    });

    app.put('/api/accounts:id', function (req, res) {
        var id = req.params.id;
        var name = req.body.name;
        if (name == null || name.length == 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                error: "Missing Name."
            });
        } else {
            req.models.account.get(id, function (err, account) {
                account.Name = name;
                account.save(function (err) {
                    if (err)
                        res.status(HttpStatus.BAD_REQUEST).send({
                            error: err.message
                        });
                    else
                        res.status(HttpStatus.OK).send(account);
                })
            });
        };
    });

    app.delete('/api/accounts:id', function (req, res) {
        var id = req.params.id;
        req.models.account.get(id, function (err, account) {
            account.remove(function (err) {
                if (err)
                    res.status(HttpStatus.BAD_REQUEST).send({
                        error: err.message
                    });
                else
                    res.status(HttpStatus.OK).send(account);
            })
        });
    });


}