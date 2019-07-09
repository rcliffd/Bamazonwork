DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100),
department_name VARCHAR (100),
price INTEGER,
stock_quantity INTEGER, 
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kibble", "Pet", 10, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charger", "Computer", 15, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Towel", "Home", 25, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Bulbs", "Home", 10, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Gel", "Beauty", 7, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Animal Pak", "Health", 30, 7);


select * from products;