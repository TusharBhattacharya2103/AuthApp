const express = require('express');
const router = express.Router();

//import controllers and middlewares
const {login, signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/login", login);
router.post("/signup", signup);

// testing route to verify auth middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for test",
    });
});
// protected route 
// route that only student can view this.
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for students",
    });
});

// Route that only admin can view this.
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for admin",
    });
});


module.exports = router;