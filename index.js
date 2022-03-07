if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const status = require("express-status-monitor");

require("./configs/database");

// Initialization
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", (req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline'");
    next();
});
app.use(
    status({
        title: "CERTISETU API",
        path: "/",
    })
);

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening on port", PORT));
