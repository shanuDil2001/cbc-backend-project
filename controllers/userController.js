import { env } from "../config/validateEnv.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {

   async function hashPassword(password) {
      try {
         return await bcrypt.hash(password, env.SALT_ROUNDS);
      } catch (error) {
         throw new Error("Failed to hash password.");
      }
   }

   try {
      const hash = await hashPassword(req.body.password);

      const newUser = new User({
         email: req.body.email,
         fname: req.body.fname,
         lname: req.body.lname,
         password: hash,
         role: req.body.role
      });

      const savedUser = await newUser.save();

      return res.status(201).json({
         message: "User created successful.",
         user: {
            email: savedUser.email,
            role: savedUser.role
         }
      });
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: error.message || "Internal server error."
      });
   }
}

export async function loginUser(req, res) {
   const enteredEmail = req.body.email;
   const enteredPassword = req.body.password;

   try {
      const user = await User.findOne({ email: enteredEmail });

      if (user != null) {
         const isPasswordCorrect = await bcrypt.compare(enteredPassword, user.password);

         if (!isPasswordCorrect) {
            return res.status(401).json({
               message: "Invalid credentials."
            });
         } else {
            if (user.isBlocked == true) {
               return res.status(401).json({
                  message: "You are blocked"
               });
            } else {
               const payload = {
                  email: user.email,
                  fname: user.fname,
                  lname: user.lname,
                  role: user.role,
                  isBlocked: user.isBlocked
               }

               const token = jwt.sign(payload, env.JWT_KEY);

               return res.status(200).json({
                  message: "Login successful.",
                  token: token
               });
            }
         }
      } else {
         return res.status(404).json({
            message: "User not found."
         });
      }
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: error.message || "Internal srever error."
      });
   }
}