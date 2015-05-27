module.exports = function (app) {

    // Register database models

    require('../models/')(app);
    var HttpStatus = require('http-status-codes');

    var bodyParser = require('body-parser')
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));

    app.get('/api/categories', function (req, res) {
        req.models.category.find({}, function (err, categories) {
            res.json(categories);
        });
    });

    app.get('/api/categories/:id', function (req, res) {
        var id = req.params.id;
        req.models.category.get(id, function (err, categories) {
            res.json(categories);
        });
    });

    app.post('/api/categories', function (req, res) {
        var name = req.body.name;
        if (name == null || name.length == 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                error: "Missing Name."
            });
        } else {
            var parentId = req.body.parentId || null;
            req.models.category.create({
                Name: name,
                ParentId: parentId
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

    app.put('/api/categories/:id', function (req, res) {
        var id = req.params.id;
        var name = req.body.name;
        if (name == null || name.length == 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                error: "Missing Name."
            });
        } else {
            req.models.category.get(id, function (err, category) {
                category.Name = name;
                category.save(function (err) {
                    if (err)
                        res.status(HttpStatus.BAD_REQUEST).send({
                            error: err.message
                        });
                    else
                        res.status(HttpStatus.OK).send(category);
                })
            });
        };
    });

    app.delete('/api/categories/:id', function (req, res) {
        var id = req.params.id;
        req.models.category.get(id, function (err, categories) {
            categories.remove(function (err) {
                if (err)
                    res.status(HttpStatus.BAD_REQUEST).send({
                        error: err.message
                    });
                else
                    res.status(HttpStatus.OK).send(categories);
            })
        });
    });
}