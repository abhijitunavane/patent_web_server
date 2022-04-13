import express from "express";
import ManufacturerModel from "./models/ManufacturerModel.js";
import ProductModel from "./models/ProductModel.js";
import bcrypt from "bcrypt";
import SHA256 from "crypto-js/sha256.js";
const router = express.Router();

// Add Manufacturer
router.post("/addManufacturer", async (req, res) => {
  const reqbody = req.body;

  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.send("User exists!");
      } else {
        // Hashed The entered Password by user
        const hashedPassword = bcrypt.hashSync(reqbody.password, 10);
        reqbody.password = hashedPassword;

        // Create model of that user
        const newUser = new ManufacturerModel(reqbody);

        // Save the user to the database
        newUser
          .save()
          .then(res.send(`User Added Successfully!`)) // Response
          .catch((err) => {
            res.send(`Error: ${err}`);
          });
      }
    })
    .catch((err) => res.send(err));
});

// Get Manfacturers
router.get("/getManufacturers", async (req, res) => {
  await ManufacturerModel.find()
    .then((users) => {
      if (users.length) {
        res.send(`Users : ${users}`);
      } else {
        res.send(`No Users Found!`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get Manfacturer by username /email
router.post("/getManufacturer", async (req, res) => {
  // As in this case email is unique so find user by email
  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            email: user.email
          });
        } else {
          res.send(`User exists, but password is incorrect try again!`);
        }
      }
      // Response
      else res.send("User Not Found!"); // user Not found response
    })
    .catch((err) => {
      res.send(err);
    });
});

// Find manufacture by email send response
router.post("/getManufacturerByEmail", async (req, res) => {
  // As in this case email is unique so find user by email
  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.send({
          status: "User Found",
          user: {
            name: user.name,
            company_name: user.company_name,
            email: user.email,
          }
        });
      }
      // Response
      else res.send("User Not Found!"); // user Not found response
    })
    .catch((err) => {
      res.send(err);
    });
});

// findAndUpdate Manufacturer by email
router.post("/updateManufacturer", async (req, res) => {
  const update = {
    name: req.body.name,
    company_name: req.body.company_name,
  };

  await ManufacturerModel.findOneAndUpdate(
    { email: req.body.email },
    update,
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.send({
          status: "User Updated",
          user: {
            name: user.name,
            company_name: user.company_name,
          },
        });
      } else {
        res.send({ status: "User Not Found" });
      }
    })
    .catch((err) => res.send(err));
});

// Add Product
router.post("/addProduct", async (req, res) => {
  var reqbody = req.body;

  await ProductModel.findOne().sort({$natural: -1})
    .then((prevProduct) => {
      if (prevProduct) {
        var currProductObj = reqbody;

        //  current product id = previous product hash
        currProductObj["product_id"] = prevProduct["product_hash"];

        var currentProductHash = SHA256(JSON.stringify(currProductObj));
        
        currProductObj["product_hash"] = currentProductHash.toString();

        // Create model of the product
        const newProduct = new ProductModel(currProductObj);

        // Save the model to the database
        newProduct
          .save()
          .then(res.send(currProductObj["product_hash"])) // Response
          .catch((err) => {
            res.send(`Error: ${err}`);
          });
      } else {
        // "No previous hash == 1st product"
        var currProductObj = reqbody;

        currProductObj["product_id"] = SHA256(JSON.stringify(currProductObj)); 

        var currentProductHash = SHA256(JSON.stringify(currProductObj));
        
        currProductObj["product_hash"] = currentProductHash.toString();

        // Create model of the product
        const newProduct = new ProductModel(currProductObj);

        // Save the model to the database
        newProduct
          .save()
          .then(res.send(currProductObj["product_hash"])) // Response
          .catch((err) => {
            res.send(`Error: ${err}`);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });


});

// Get Products
router.get("/getProducts", async (req, res) => {
  await ProductModel.find()
    .then((products) => {
      if (products.length) {
        res.json({products});
      } else {
        res.send(`No products Found!`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});


export default router;
