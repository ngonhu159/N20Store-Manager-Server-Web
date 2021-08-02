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
    var resultDevice = await db.queryProductInformation();
    if (resultDevice == "queryProductInformation-ERROR") {
        return ({ state: false, mesessge: "Error: Don't fine data in database." });
    } else {
        return ({ state: true, mesessge: resultDevice });
    }
}

async function addProduct(product) {
    var resultDevice = await db.queryAddProduct(product);
    if (resultDevice == "queryAddProduct-OK") {
        return ({ state: true, mesessge: "Successful" });
    } else {
        return ({ state: false, mesessge: "Error: Can not add product" });
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
        console.log("ERROR");
        res.status(200).send({ state: false });
    } else {
        console.log("SUCCESSFUL");
        result = await addProduct(newProduct);
        res.status(200).send(result);
    } 
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Listening on *: 3000");
});