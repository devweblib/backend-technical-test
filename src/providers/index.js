const sqlUtils = require('../util/sql');
var prodiver = {};

/**
 * Find all
 */
prodiver.getOrdersData = function (ids) {
    return new Promise(function (resolve) {
        global.connection.query(sqlUtils.prepareFindAllRequest('order', []._, ids, [`id`, `amount`, `userId`]), [
            ids
        ], function (err, rows) {
            console.log(err, rows);
            resolve(rows);
        });
    });
};

prodiver.findProducts = function (ids) {
    return new Promise(function (resolve) {
        global.connection.query(sqlUtils.prepareFindAllRequest('products', []._, ids, ['id', 'name', 'price']), [
            ids
        ], function (err, rows) {
            resolve(rows);
        });
    });
};

prodiver.findOrderProductsByOrderId = function (orderId) {
    return new Promise(function (resolve) {
        global.connection.query(sqlUtils.prepareFindAllRequest('orderproducts', 'order_id', orderId, ['product_id as productId', 'order_id']),
            [ orderId
        ], function (err, rows) {
            resolve(rows);
        });
    });
};

/**
 * Create
 */
prodiver.createProduct = function (name, price) {
    return new Promise(function (resolve) {
        global.connection.query('INSERT INTO `products` (`name`, `price`) VALUES (?,?)', [name, price], function (err, data) {
            return prodiver.findProducts([data.insertId]).then(function (order) { resolve(order[0]); });
        });
    });
};

prodiver.createOrderProduct = function (orderId, productId) {
    return new Promise(function (resolve) {
        global.connection.query('INSERT INTO `orderproducts` (`orderId`, `productId`) VALUES (?,?)', [orderId, productId], function (err, data) {
            return resolve(data);
        });
    });
};

prodiver.createOrder = function (amount, userId, productIds) {
    return new Promise(function (resolve) {
        global.connection.query('INSERT INTO `order` (`amount`, `userId`) VALUES (?,?)', [amount, userId], function (err, result) {
            for (let productId of productIds) {
                prodiver.createOrderProduct(result.insertId, productId)
            }
            return prodiver.getOrdersData([result.insertId]).then(function (order) { resolve(order[0]); });
        });
    });
};

/**
 * Update
 */
prodiver.updateProductById = function (id, data) {
    return new Promise(function (resolve) {
        var updateCmd = sqlUtils.prepareUpdateByIdRequest('products', id, data);
        global.connection.query(updateCmd, function (err, data) {
            return prodiver.findProducts([id]).then(function (product) { resolve(product[0]); });
        });
    });
}

prodiver.updateOrderById = function (id, data) {
    return new Promise(function (resolve) {
        var updateCmd = sqlUtils.prepareUpdateByIdRequest('order', id, data);
        global.connection.query(updateCmd, function (err, data) {
            return prodiver.getOrdersData([id]).then(function (order) { resolve(order[0]); });
        });
    });
}

module.exports = prodiver;
