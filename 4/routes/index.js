const express = require("express");
const router = express.Router();

const layout = "partials/main-layout";

//connect to db
const dbConnection = require("../connection/db");

//root
router.get("/", (req, res) => {
  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    if (req.session.isLogin) {
      const query = `SELECT * FROM collections_tb WHERE user_id=${req.session.user.id}`;
      conn.query(query, (err, results) => {
        //   console.log(results);
        const collections = results;
        if (err) throw err;

        res.render("index", { layout, isLogin: req.session.isLogin, userId: req.session.user.id, collections });
      });
    } else {
      res.render("index", { layout, isLogin: req.session.isLogin, collections });
    }
  });
});

//task category
const collections = require("../controllers/collections");
router.get("/collections/:id", collections.get);
router.post("/add-collections", collections.post);
// router.put("/collections/:id", collections.put);
router.get("/delete-collections/:id", collections.delete);

//task
const task = require("../controllers/task");
// router.get("/task/:id", task.get);
router.post("/task", task.post);
router.get("/done-task/:id", task.updateIsDone);
router.get("/delete-task/:id", task.delete);

//auth
const auth = require("../controllers/auth");
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
