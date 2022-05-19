const router = require("express").Router();
const db = require("../../db");
const Model = require("./model");

router.post("/createUser", (req, res) => {
  // try {
  //   console.log(req.body);
  //   let users = db.users || [];
  //   const inputs = req.body;
  //   users = [inputs, ...users];
  //   db.users = users;
  //   return res.status(201).json({ message: `user created successfully` });
  // } catch (error) {
  //   return res.status(401).json({ message: `failed to create user` });
  // }
  const obj = new Model();
  return obj
    ._createUser(req.body)
    .then(() => {
      return res.status(201).json({ message: `user created successfully` });
    })
    .catch((err) => {
      return res.status(401).json({ message: `failed to create user` });
    });
});

router.get("/getUsers", (req, res) => {
  try {
    const users = db.users || [];
    return res.status(201).json(users);
  } catch (error) {
    return res.status(400).json({ message: `failed to get users` });
  }
});

router.get("/getUser", (req, res) => {
  try {
    const users = db.users || [];
    const { id } = req.query;
    let user;
    users.forEach((u) => {
      if (u.id == id) {
        user = u;
      }
    });
    if (user) {
      return res.status(201).json(user);
    }
    throw new Error("failed-to-get-user");
  } catch (error) {
    if (error.toString().match("failed-to-get-user")) {
      return res.status(401).json({ message: `user not found` });
    }
    return res.status(500).json({ message: `internal server error` });
  }
});

router.put("/updateUser/:id", (req, res) => {
  try {
    const { id } = req.params;
    let users = db.users || [];
    const inputs = req.body;
    const getIndex = users.findIndex((u) => {
      return u.id == id;
    });
    if (getIndex == -1) {
      throw new Error("no-user-found");
    }
    users[getIndex] = inputs;
    users[getIndex].id = id;
    db.users = users;
    return res.status(200).json({ message: `user updated successfully` });
  } catch (error) {
    if (error.toString().match("no-user-found")) {
      return res.status(401).json({ message: `no user found` });
    }
    return res.status(500).json({ message: `internal server error` });
  }
});

router.delete("/deleteUser/:id", (req, res) => {
  try {
    let users = db.users || [];
    const { id } = req.params;
    const getIndex = users.findIndex((u) => {
      return u.id == id;
    });
    if (getIndex == -1) {
      throw new Error("no-user-found");
    }
    users.splice(getIndex, 1);
    db.users = users;
    return res.status(201).json({ message: `user deleted successfully` });
  } catch (error) {
    if (error.toString().match("no-user-found")) {
      return res.status(401).json({ message: `no user found` });
    }
    return res.status(500).json({ message: `internal server error` });
  }
});

module.exports = router;
