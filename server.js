const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");


// importing passport
const passport = require("passport");
const { JwtStrategy } = require("./passport-config")


const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passport.use(JwtStrategy)

// routes
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);


console.log("Connecting to database...💻");

mongoose
    .connect(
        process.env.MONGODB_URI,
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }
    )
    .then(() => console.log("Database connected! 😎"))
    .catch((error) => console.log(error, "Database did not connect! ☹️❌"));


app.all("*", (req, res) => {
    res.status(500).send("Invalid path")
})

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}...🎧`)
});