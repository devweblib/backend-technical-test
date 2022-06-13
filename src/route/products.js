var express = require('express');
var router = express.Router();
var provider = require('../providers');

module.exports = function (globalRouter) {
    globalRouter.get('/product', function (req, res) {
        var ids = req.query.ids;

        provider.findProducts(ids).then(function(result) {
            return res.send(result);
        });
    });

    globalRouter.get('/product/:id', function (req, res) {
        var id = req.params.id;

        provider.findProducts([id]).then(function(result) {
            return res.send(result[0]);
        });
    });

    globalRouter.post('/product', function (req, res) {
        var body = req.body;

        provider.createProduct(body.name, body.price).then(function(result) {
            return res.send(result);
        });
    });

    globalRouter.post('/product/:id', function (req, res) {
        var id = req.params.id;

        provider.updateProductById(id, req.body).then(function(result) {
            return res.send(result);
        });
    });
}
