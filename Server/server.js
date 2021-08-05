var db = require("./database/db.js");

var express = require("express");
var app = express();

//post-get
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = require("http").Server(app);

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

async function getProductInformation() {
    var result = await db.queryProductInformation();
    if (result == "queryProductInformation-ERROR" || result == "rows undefined" || result == "error") {
        return ({ state: false, mesessge: "Error: Don't fine data in database." });
    } else {
        return ({ state: true, mesessge: result });
    }
}

async function addProduct(product) {
    var result = await db.queryAddProduct(product);
    if (result== "queryAddProduct-OK") {
        return ({ state: true, mesessge: "Product add successful" });
    } else {
        return ({ state: false, mesessge: "Error: Unable to add product" });
    }
}

async function updateProduct(product) {
    var result = await db.queryUpdateProduct(product);
    if (result == "queryUpdateProduct-OK") {
        return ({ state: true, mesessge: "Product update successful" });
    } else {
        return ({ state: false, mesessge: "Error: Unable to update product" });
    }
}

async function deleteProduct(product) {
    var result = await db.queryDeleteProduct(product);
    if (result == "queryDeleteProduct-OK") {
        return ({ state: true, mesessge: "Product delete successful" });
    } else {
        return ({ state: false, mesessge: "Error: Unable to delete product" });
    }
}

app.get("/get-product-information", async function (req, res) {
    let result = await getProductInformation();
    res.status(200).send(result);
});

app.post("/add-product", async function (req, res) {
    newProduct = req.body;
    let isProductAvailable = false;
    let result = await getProductInformation();
    if (result["state"]) {
        result["mesessge"].forEach(product => {
            if (product["code"] == newProduct["code"]) {        // product is available
                isProductAvailable = true;
            }
        }); 
    }
    if (isProductAvailable) {
        res.status(200).send({ state: false, mesessge: "Product available" });
    } else {
        result = await addProduct(newProduct);
        res.status(200).send(result);
    } 
});

app.post("/update-product", async function (req, res) {
    newProduct = req.body;
    let isProductAvailable = false;
    let result = await getProductInformation();
    if (result["state"]) {
        result["mesessge"].forEach(product => {
            if (product["code"] == newProduct["code"]) {        // product is available
                isProductAvailable = true;
            }
        }); 
    }
    if (!isProductAvailable) {
        res.status(200).send({ state: false, mesessge: "Product not available" });
    } else {
        result = await updateProduct(newProduct);
        res.status(200).send(result);
    }
});

app.post("/delete-product", async function (req, res) {
    newProduct = req.body;
    let isProductAvailable = false;
    let result = await getProductInformation();
    if (result["state"]) {
        result["mesessge"].forEach(product => {
            if (product["code"] == newProduct["code"]) {        // product is available
                isProductAvailable = true;
            }
        }); 
    }
    if (!isProductAvailable) {
        res.status(200).send({ state: false, mesessge: "Product not available" });
    } else {
        result = await deleteProduct(newProduct);
        res.status(200).send(result);
    }
});

app.post("/receipt-payment", async function (req, res) {
    recreipt = req.body;
    let checkResult = true;
    recreipt.forEach(async element => {
        console.log(element)
        element["quantity"] = element["quantity"] - element["numberOf"];
        let result = await db.queryUpdateQuantity(element);
        if (result != "queryUpdateQuantity-OK") {
            checkResult = false
        }
    })
    if (checkResult) {
        res.status(200).send({ state: true, mesessge: "Product quatity update successful" });
    } else {
        res.status(200).send({ state: false, mesessge: "Error: Unable to update product quantity" });
    }
});

app.post("/query-product", async function (req, res) {
    codeQuery = req.body;
    let result = await db.queryQueryProduct(codeQuery["code"]);
    if (result != "rows undefined" && result != "queryQueryProduct-ERROR" && result != "error") {
        res.status(200).send({ state: true, mesessge: result });
    } else {
        res.status(200).send({ state: false, mesessge: "Error: Unable to query product by code" });
    }
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Listening on *: 3000");
});