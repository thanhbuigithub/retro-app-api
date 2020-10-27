const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
router.post("/register", async (req, res) => {
  const { username, password, name, email } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check unique username
  const isUsernameExists = await User.findOne({ username: username });
  if (isUsernameExists)
    return res.status(400).send("Username is already exists");

  //Check unique email
  const isEmailExists = await User.findOne({ email: email });
  if (isEmailExists) return res.status(400).send("Email is already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username: username,
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check username exists
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).send("Username is wrong.");
  //Check password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send("Password is wrong.");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("authorization", token).send(token);
});

module.exports = router;
