const http = require("http");
const sqlite = require("sqlite3");
let db = new sqlite.Database("main.db");
const {
  createTableQuery,
  loginUserQuery,
  registerUserQuery,
  UpdateUserQuery,
  fetchUserQuery,
  deleteUserQuery,
} = require("../Node testing/const");

http
  .createServer(function (req, res) {
    // console.log(req);
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (req.url) {
      case "/login":
        loginUser(req, res);
        break;
      case "/register":
        RegisterUser(req, res);
        break;
      case "/update":
        UpdateUserData(req, res);
        break;
      case "/update":
        UpdateUserData(req, res);
        break;
      case "/users":
        fetchUser(req, res);
        break;
      case "/delete":
        deleteUser(req, res);
        break;
      default:
        res.end("Error Url Not Found");
    }
  })
  .listen(8080);

db.run(createTableQuery, (err) => {
  console.log(err);
});

const RegisterUser = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let jsonData = JSON.parse(data);
    db.run(registerUserQuery, [jsonData.username, jsonData.password], (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error Adding USer");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      }
    });
  });
};

const loginUser = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let jsonData = JSON.parse(data);
    db.get(
      loginUserQuery,
      [jsonData.username, jsonData.password],
      (err, rs) => {
        if (rs) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        } else {
          res.writeHead(401, "Unauthorized", { "Content-Type": "text/plain" });
          res.end("Username or password error");
        }
      }
    );
  });
};

const UpdateUserData = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let jsonData = JSON.parse(data);
    db.run(UpdateUserQuery, [jsonData.password, jsonData.username], (err) => {
      if (err) {
        res.writeHead(400, "BAD REQUEST");
        res.end("USER NOT UPDATED");
      } else {
        res.writeHead(201, "UPDATED");
        res.end("USER UPDATED");
      }
      // res.end('A')
    });
  });
};

const deleteUser = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let jsonData = JSON.parse(data);
    console.log(data);
    db.run(deleteUserQuery, [jsonData.username], (err) => {
      if (err) {
        res.end("ERROR IN DELETING USER");
      } else {
        res.end("USER DELETED");
      }
      // res.end('A')
    });
  });
};

const fetchUser = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    db.all(fetchUserQuery, [], (err, result) => {
      console.log(result);
      if (result) {
        res.end(JSON.stringify(result));
      } else {
        res.end("NO USER FOUND");
      }
    });
  });
};
