const Joi = require("joi");
const validateWith = require("../middleware/validation");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const db = require("../models");
const User = db.users;

const schema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  role: Joi.string().required().min(2),
});

router.post("/signup", validateWith(schema), async (req, res) => {
  const { name, email, password, role } = req.body;
  const oldUser = await User.findOne({ where: { email: email } });
  if (oldUser)
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name,
    email: email,
    password: encryptedPassword,
    role: role,
  });
  res.status(201).send(user);
});

//   router.get("/", (req, res) => {
//     res.send(usersStore.getUsers());
//   });

module.exports = router;
