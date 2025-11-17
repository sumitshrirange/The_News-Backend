const jwt = require("jsonwebtoken");

const googleCallback = (req, res) => {
  try {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

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
      return res.status(401).json({ 
        success: false,
        message: "User not authenticated"
      });
    }

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      success: true,
      user: req.user,
      token,
    });

  } catch (error) {
    console.error("Error fetching user details", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { googleCallback, getUser };
