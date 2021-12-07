const dbConnection = require("../connection/db");
const layout = "partials/main-layout";

module.exports = {
  get: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `SELECT * FROM collections_tb WHERE id=${req.params.id}`;
      conn.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);
        const collectionTitle = results[0].name;
        const collectionId = results[0].id;

        const query = `SELECT * FROM task_tb WHERE collections_id=${collectionId}`;
        conn.query(query, (err, results) => {
          if (err) throw err;
          // console.log(results);
          const tasks = results;

          res.render("add", { layout, isLogin: req.session.isLogin, collectionTitle, collectionId, tasks });
        });
      });
    });
  },
  post: (req, res) => {
    const { name, userId } = req.body;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `INSERT INTO collections_tb (id, name, user_id) VALUES (NULL, '${name}', ${userId});`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        res.redirect("/");
      });
    });
  },
  put: (req, res) => {
    const { name, user_id } = req.body;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `UPDATE collections_tb SET name='${name}', user_id=${user_id} WHERE id=${req.params.id};`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        res.json(results);
      });
    });
  },
  delete: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `DELETE FROM collections_tb WHERE id=${req.params.id}`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Success delete collection",
        };
        res.redirect("/");
      });
    });
  },
};
