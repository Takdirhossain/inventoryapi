const express = require("express");
const router = express.Router();
const connection = require("../config/db");

router.post("/", (req, res) => {
  console.log(req.body);
  const { twelbkg, twentyfive, thirtyfive, fourtyfive, date, brand } = req.body;
  const sql = `INSERT INTO product (12kg, 25kg, 35kg, 45kg, date, brand) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [twelbkg, twentyfive, thirtyfive, fourtyfive, date, brand];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting data into database");
      return;
    }
    res.status(200).send("Data inserted successfully");
  });
});

//TODO this limit will be update 
router.get("/", async (req, res) => {
  const sql = `select * from product order by id desc limit 2`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json("something wrong at here");
    }
    res.status(200).json(result);
  });
});

//suming last 30 trip product
router.get("/last-30-trip", (req, res) => {
  const sql = `SELECT SUM(\`45kg\`) AS sum_45kg, SUM(\`12kg\`) AS sum_12kg, SUM(\`25kg\`) AS sum_25kg, SUM(\`35kg\`) AS sum_35kg FROM (SELECT * FROM product ORDER BY id DESC LIMIT 3) AS subquery;`

  connection.query(sql, (err, result) => {
    if(err){
        res.status(500).json("something wrong at here")
    } res.status(200).json(result)
  })
});
module.exports = router;
