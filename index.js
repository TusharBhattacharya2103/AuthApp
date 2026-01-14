const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//cookie parser 
// middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

// database connection
require('./config/database').connect();

// route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
