const User = require("../models/user.model");

const getUserData = async (req, res) => {
  try {
    let user = await User.findOne( req.userId ).select([
      "-password", // remove some data from response
      "-otp",
      "-otpExpiry",
      "-token",
    ]);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = getUserData;
