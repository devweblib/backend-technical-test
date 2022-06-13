var express = require('express');
var provider = require('../providers');

module.exports = function (globalRouter) {
    globalRouter.post('/order', function (req, res) {
        let body = req.body;

        provider.createOrder(body.amount, body.userId, body.products).then(function(result) {
            return res.send(result);
        });
    });

    globalRouter.get('/order', function (req, res) {
        var ids = req.query.ids;

        provider.getOrdersData(ids).then(function(result) {
            return res.send(result);
        });
    });

    globalRouter.get('/order/:id', function (req, res) {
        var id = req.params.id;

        provider.getOrdersData([id]).then(function(result) {
            return res.send(result[0]);
        });
    });

    globalRouter.post('/order/:id', function (req, res) {
        var id = req.params.id;

        provider.updateOrderById(id, req.body).then(function(result) {
            return res.send(result);
        });
    });
}
