var routes = [
    './products',
    './order',
];

module.exports = function (globalRouter) {
    routes.forEach(function (router) {
        require(router)(globalRouter);
    });
};
