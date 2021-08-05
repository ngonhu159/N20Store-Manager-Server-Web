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
            if (err) reject("error");
            if (typeof rows !== "undefined") {
                if (rows.length > 0) {
                resolve(rows);
                } else resolve("queryProductInformation-ERROR");
            } else {
                resolve("rows undefined");
            }
        });
    });
};

exports.queryAddProduct = function(product) {
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

exports.queryUpdateProduct = function(product) {
    return new Promise(function (resolve, reject) {
        conn.query(
        "UPDATE `product` SET " + 
        "`name`='" + product["name"] + "'," + 
        "`type`='" + product["type"] + "'," + 
        "`price`='" + product["price"] + "'," +
        "`quantity`='" + product["quantity"] + "'," +
        "`warranty`='" + product["warranty"] + "'," + 
        "`storage`='" + product["storage"] + "'," + 
        "`photo`='" + product["photo"] + "'," +
        "`description`='" + product["description"] + "'" +
        " WHERE `code`='" + product["code"] + "';", 
        function (err, rows) {
                if (err) reject(err);
                resolve("queryUpdateProduct-OK");
            }
        );
    });
};

exports.queryDeleteProduct = function(product) {
    return new Promise(function (resolve, reject) {
        conn.query(
        "DELETE FROM `product`" +
        " WHERE `code`='" + product["code"] + "';", 
        function (err, rows) {
                if (err) reject(err);
                resolve("queryDeleteProduct-OK");
            }
        );
    });
};

exports.queryUpdateQuantity = function(product) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE `product` SET `quantity`='" + product["quantity"] + "' WHERE `code`='" + product["code"] + "';", function (err, rows) {
                if (err) reject(err);
                resolve("queryUpdateQuantity-OK");
            }
        );
    });
};

exports.queryQueryProduct = function(code) {
    return new Promise(function (resolve, reject) {
        conn.query("SELECT * FROM product WHERE `code`='" + code + "';", function (err, rows) {
            if (err) reject(err);
            if (typeof rows !== "undefined") {
                if (rows.length > 0) {
                    resolve(rows);
                } else resolve("queryQueryProduct-ERROR");
            } else {
                resolve("rows undefined");
            }
        });
    });
};