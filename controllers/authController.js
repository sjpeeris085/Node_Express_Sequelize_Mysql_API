const Joi = require("joi");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const validateWith = require("../middleware/validation");
const db = require("../models");
const User = db.users;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post("/", validateWith(schema), async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  bcrypt.compare(password, user.password, (err, result) => {
    if (result === false)
      return res.status(400).send({ error: "Invalid email or password." });

    const token = jwt.sign(
      { userId: user.id, name: user.name, email },
      "jwtPrivateKey"
    );
    res.send(token);
  });
});

module.exports = router;
