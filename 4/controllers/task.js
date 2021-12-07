const dbConnection = require("../connection/db");

module.exports = {
  get: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `SELECT * FROM task_tb WHERE id=${req.params.id}`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        res.json(results);
      });
    });
  },
  post: (req, res) => {
    const { name, collectionsId } = req.body;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `INSERT INTO task_tb (id, name, is_done, collections_id) VALUES (NULL, '${name}', NULL, ${collectionsId}) ;`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        res.redirect(`/collections/${collectionsId}`);
      });
    });
  },
  updateIsDone: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `UPDATE task_tb SET is_done="yes" WHERE id=${req.params.id};`;
      conn.query(query, (err, results) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  },
  delete: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `DELETE FROM task_tb WHERE id=${req.params.id}`;
      conn.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);

        res.redirect("/");
      });
    });
  },
};
