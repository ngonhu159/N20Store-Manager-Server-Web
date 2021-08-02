var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "n20_store",
});

exports.queryProductInformation = function () {
    return new Promise(function (resolve, reject) {
        conn.query("SELECT * FROM product;", function (err, rows) {
            if (err) reject(err);
            if (typeof rows !== "undefined") {
                if (rows.length > 0) {
                resolve(rows);
                } else resolve("queryProductInformation-ERROR");
            } else {
                resolve("rows undefined!");
            }
        });
    });
};

exports.queryAddProduct = function(product) {
    console.log("DB: ", product)
    return new Promise(function (resolve, reject) {
        conn.query(
        "INSERT INTO `product` (`name`, `type`, `code`, `price`, `quantity`, `warranty`, `storage`, `photo`, `description`) VALUES ('" +
            product["name"] + "','" +
            product["type"] + "','" +
            product["code"] + "','" +
            product["price"] + "','" +
            product["quantity"] + "','" +
            product["warranty"] + "','" +
            product["storage"] + "','" +
            product["photo"] + "','" +
            product["description"] + "');", function (err, rows) {
                if (err) reject(err);
                resolve("queryAddProduct-OK");
            }
        );
    });
};


// INSERT INTO `product` (`name`, `type`, `code`, `price`, `quantity`, `warranty`, `storage`, `photo`, `description`) VALUES ('123a', '123a', '123a', '123', '123', '123', '123a', '123a', '123a');