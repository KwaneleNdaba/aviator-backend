const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Destructure email and password directly

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
