import SHA256 from "crypto-js/sha256.js";

function generateHash() {

    var productObj = {
        "product_id": 1,
        "product_name": "Nike air jordan",
        "product_brand": "Nike"
    }

    console.log(productObj);

    var productObjString = JSON.stringify(productObj);

    var hash = SHA256(productObjString);
    console.log("Hash: " + hash.toString());
}

generateHash();