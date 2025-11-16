const jwt = require("jsonwebtoken");

const googleCallback = (req, res) => {
  try {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    res.redirect(
      `${process.env.FRONTEND_URL}/success-login?access_token=${token}`
    );
  } catch (error) {
    console.error("Error during google callback", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};

const getUser = (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
    }
    res.json({
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching user details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { googleCallback, getUser };
