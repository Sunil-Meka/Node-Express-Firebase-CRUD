const router = require("express").Router();
const db = require("../../db");
const Model = require("./model");

router.post("/createUser", (req, res) => {
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

router.get("/getUser/:id", (req, res) => {
  const obj = new Model();
  const { id } = req.params;
  return obj
    ._getUser(id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
		if(err.toString().match("User not found")){
			return res.status(404).json({ message: `User not found` });
		}
      return res.status(400).json({ message: `failed to get user` });
    });
});

router.get("/getUsers", (req, res) => {
  const obj = new Model();
  return obj
    ._getUsers()
    .then((users) => {
      return res.status(201).json(users);
    })
    .catch((err) => {
      return res.status(500).json({ message: `internal error` });
    });
});

router.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const obj = new Model();
  return obj
    ._updateUser(id, req.body)
    .then(() => {
      return res.status(201).json({ message: `user updated successfully` });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ message: `error in updating user` });
    });
});

router.delete("/deleteUser/:id", (req, res) => {
 const {id} = req.params
 const obj = new Model()
 return obj._deleteUser(id).then(()=>{
	 return res.status(200).json({message:`user deleted successfully`})
 }).catch((err)=>{
	 return res.status(500).json({message:`failed to delete user`})
 })
});

module.exports = router;
