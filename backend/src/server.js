const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rickandmorty",
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM login where `email` = ? AND `password` = ?";
  const values = [req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("listening");
});
