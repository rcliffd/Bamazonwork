var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dutton",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  bamazonItems();
});

function bamazonItems() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log("Item Id:" + " " + results[i].item_id);
      console.log("Product Name:" + " " + results[i].product_name);
      console.log("Department:" + " " + results[i].department_name);
      console.log("Price: $" + results[i].price + "\n");

      // connection.end();
    }
    prompt();
  });
}

function prompt() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "number",
          name: "idNumber",
          message: "What is the ID of the product of interest? "
        },
        {
          type: "number",
          name: "quantity",
          message: "Amount you would like?"
        }
      ])
      .then(function(inquirerResponse) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === inquirerResponse.idNumber) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.stock_quantity > inquirerResponse.quantity) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity:
                  chosenItem.stock_quantity - inquirerResponse.quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              //  console.log(chosenItem.product_name)
              console.log("Product purchased successfully!");
              console.log("Summary:");
              console.log("Item Name:" + chosenItem.product_name);
              console.log("Item Count:" + inquirerResponse.quantity);
              console.log(
                "Total Cost: $" + chosenItem.price * inquirerResponse.quantity
              );
            }
          );
        } else {
          console.log("Insufficient stock.");
        }
      });
  });
}
