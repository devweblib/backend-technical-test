CREATE DATABASE orders_db;

CREATE TABLE `order` (
    id int(11) NOT NULL AUTO_INCREMENT,
    amount int(11) NOT NULL,
    userId int(11),
    PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
    id int(11) NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `price` decimal(11,2) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `orderProducts` (
    order_id int(11) NOT NULL,
    product_id int(11)
);

CREATE TABLE `user` (
    id int(11) NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `user` VALUES (1, 'Steve', 'Roger'), (2, 'Tony', 'Stork'), (3, 'Peter', 'Quille'), (4, 'Steve', 'Work');
ALTER TABLE `orderProducts` ADD CONSTRAINT `fk_order_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;
ALTER TABLE `orderProducts` ADD CONSTRAINT `fk_order_product_order_id` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE;

INSERT INTO `products` VALUES
    (1, 'meat', 20.01),
    (2, 'carrot with cream', 11),
    (3, 'duck hunt', 1.74),
    (4, 'Burger extreme bacon', 74.23);

