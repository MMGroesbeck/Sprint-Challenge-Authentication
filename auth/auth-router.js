
const router = require('express').Router();
const bcrypt = require("bcryptjs");

const TokenGen = require("../api/token-gen.js");
const Users = require("./users-model.js");

router.post("/test", (req, res) => {
  res.status(200).json(req.body.name);
});

router.post('/register', (req, res) => {
  let user = req.body;
  const salter = process.env.HASH_ROUNDS || 14;
  const pwHash = bcrypt.hashSync(user.password, salter);
  user.password = pwHash;
  Users.add(user)
    .then((saved) => {
        const token = TokenGen.generateToken(saved);
      res.status(201).json({ message: "Welcome", token });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findWithPass({ username })
    .then(([found]) => {
      if (found) {
        if (bcrypt.compareSync(password, found.password)) {
          const token = TokenGen.generateToken(found);
          res.status(200).json({ message: "Welcome", token });
        } else {
          res
            .status(401)
            .json({ message: "Authentication failed. You cannot pass!" });
        }
      } else {
        res.status(400).json({ message: "Username and password required. " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
