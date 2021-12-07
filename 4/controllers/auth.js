const dbConnection = require("../connection/db");

module.exports = {
  register: (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      req.session.message = {
        type: "danger",
        message: "Please insert all field!",
      };

      return res.redirect("/");
    }

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `INSERT INTO users_tb (id, email, username, password) VALUES (NULL, '${email}', null, '${password}');`;
      conn.query(query, (err, results) => {
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Register has successfull!",
        };
        res.redirect("/");
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      req.session.message = {
        type: "danger",
        message: "Please insert all field!",
      };

      return res.redirect("/");
    }

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `SELECT * FROM users_tb WHERE email='${email}' AND password='${password}';`;
      conn.query(query, (err, results) => {
        //   console.log(results);
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Login has successfull!",
        };

        req.session.isLogin = true;
        req.session.isAdmin = results[0].status;

        req.session.user = {
          id: results[0].id,
          email: results[0].email,
        };
        console.log("Sign in as", req.session.isAdmin);
        res.redirect("/");
      });
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
