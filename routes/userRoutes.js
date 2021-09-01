const express = require('express');
const router = express.Router();

const { registerUser, loginUser, deleteUser } = require("../controllers/userControllers")


// router.get("/test", (req, res) => {
//     res.status(200).json({message: "connected to user routes"})
// })

// register a new user
router.post("/register", registerUser)

// login a user
router.post("/login", loginUser)

// delete a user
router.delete("/delete/:userId", deleteUser)




module.exports = router