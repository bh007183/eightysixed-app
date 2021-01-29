// requires the model folder

const { request } = require("express");
const db = require("../models");

module.exports = function (app) {
  // create route for adding to the table business in the db:
  app.post("/api/customer", async (req, res) => {
    const data = await db.Customer.create(req.body);
    res
      .status(200)
      .json(data)
      .catch((err) => {
        res.status(500);
        console.err(err);
        throw err;
      });
  });
  // get route for reading the whole table Customer in the db:
  app.get("/api/customer", async (req, res) => {
    const data = await db.Customer.findall();
    res
      .status(200)
      .json(data)
      .catch((err) => {
        res.status(500);
        console.err(err);
        throw err;
      });
  });

  app.post("/api/customer/search", async (req, res) => {
    console.log(req.body)
    const data = await db.Customer.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }

    })
    
      res
      .status(200)
      .json(data)
      
      
  })

  // update route for updating the info in the table Customer in the db: WIP
  app.put("/api/customer/:id", async (req, res) => {
    const data = await db.Customer.update(req.body, {
      where: { id: req.body.id },
    });
    res
      .status(200)
      .json(data)
      .catch((err) => {
        res.status(500);
        console.err(err);
        throw err;
      });
  });

  // delete route for deleting the info in the table Customer in the db:
  app.put("/api/customer/:id", async (req, res) => {
    const data = await db.Customer.destroy({ where: { id: req.params.id } });
    res
      .status(200)
      .json(data)
      .catch((err) => {
        res.status(500);
        console.err(err);
        throw err;
      });
  });
};
