import express from "express";
import Model from "../model/usersDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkAuth from "../middleware/checkAuth.js";




const router = express.Router();

// To register a user
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password is less than 8 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await Model.create({ firstName, lastName, email, password: hash }).then(
        (user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: maxAge }
          );
          
          res.status(201).json({ message: "User successfully created", user
          } );
        }
      );
    });
  } catch (err) {
    res.status(400).json({
      message: "User not successfully created",
      error: err.message,
    });
  }
});

// auth login
router.post("/login", checkAuth, async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password is provided
  if (!email || !password) {
    return res.status(400).json({ message: "email or password not provided " });
  }
  try {
    const user = await Model.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "Login not successful", error: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: maxAge }
          );
        
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ message: "Login successful", user});
        } else {
          res.status(400).json({ message: "Unauthorized Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: "An error occurred", error: err.message });
  }
});


// Protected route: Dashboard

  router.get("/dashboard/:id", checkAuth, async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);
      res.status(201).json({ message: "Welcome to your dashboard", data});
    } catch (err) {
      res.status(400).json({ success: false, message: "Unauthorized user" });
    }
  });


// logout
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/login");
});



export default router;
