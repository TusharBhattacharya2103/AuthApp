const jwt = require("jsonwebtoken");
require("dotenv").config(); // jwt sceret

//AUTH
exports.auth = (req, res, next) => {
  try {

    const token =
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

/* ================= STUDENT ================= */
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role not matching",
        });
    }
};

//ADMIN MIDDLEWARE
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This route is for admins only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin role verification failed",
        });
    }
};
