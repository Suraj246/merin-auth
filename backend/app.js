import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// const path = require("path");
import path from "path";
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("database is connected"))
  .catch((err) => console.error(err));

const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    let token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = new mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAvailable = await User.findOne({
      email: email,
      password: password,
    });
    if (userAvailable) {
      if (
        password === userAvailable.password &&
        email === userAvailable.email
      ) {
        const token = await userAvailable.generateAuthToken();

        // const token = jwt.sign(
        //   { _id: userAvailable._id },
        //   process.env.JWT_KEY,
        //   { expiresIn: "1h" }
        // );
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });

        res.status(200).json({
          message: "login successful",
          userAvailable: userAvailable,
          token,
        });
      } else {
        res.status(401).json({ message: "email or password incorrect" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.send({ message: err });
  }
});

const jwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const tokenUser = jwt.verify(token, process.env.JWT_KEY);

    const rootUser = User.findOne({
      _id: tokenUser._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      console.log("user not found");
    } else {
      req.token = token;
      req.userID = rootUser._id;
      req.tokenUser = tokenUser;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    // res.status(401).send("Unautorized:No token provided");
    console.log(err.message);
  }
};
// app.get("/", (req, res) => {
//   res.send("home");
//   console.log(req.cookies.token);
// });

app.get("/user", jwtAuth, (req, res, next) => {
  // res.send("home");
  res.cookie("user", "token");

  // console.log(req.token);
  // console.log(req.rootUser);
  // console.log(req.cookies.token, "this is cookies jwt token");
});
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email: email }, (err, user) => {
//     if (user) {
//       if (password === user.password) {
//         jwt.sign(
//           { _id: user._id },
//           process.env.JWT_KEY,
//           { expiresIn: "1h" },
//           (err, token) => {
//             if (err) {
//               res.send({ message: "token not found" });
//             }
//             // res.cookie("token", token, {
//             //   expires: new Date(Date.now() + 2592000000),
//             //   httpOnly: true,
//             // }),
//             res.send({
//               message: "Login Successfull",
//               user: user,
//               token: token,
//               token: token,
//             });
//           }
//         );
//       } else {
//         res.send({ message: "Password didn't match" });
//       }
//     } else {
//       res.send({ message: "User not registered" });
//     }
//   });
// });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExit = await User.findOne({ email: email });

    if (userExit) {
      return res.status(409).json({ message: "user already exits" });
    }
    const user = new User({ name, email, password });
    const newUser = await user.save();
    if (newUser) {
      return res.status(201).json({ success: "user successfully created" });
    }
  } catch (err) {
    return res.status(422).json({ message: "error" });
  }
});
// app.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;
//   User.findOne({ email: email }, (err, user) => {
//     if (user) {
//       res.send({ message: "User already registerd" });
//     } else {
//       const user = new User({
//         name,
//         email,
//         password,
//       });
//       user.save((err) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send({ message: "Successfully Registered, Please login now." });
//         }
//       });
//     }
//   });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("listening on", PORT);
});
