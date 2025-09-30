import User from "../models/userModel.js";

export async function createUser(req, res) {
   const newUser = new User({
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
      role: req.body.role
   });

   try {
      const savedUser = await newUser.save();
      console.log(savedUser);
      res.status(201).json({
         message: "User created successful.",
         user: {
            email: savedUser.email,
            role: savedUser.role
         }
      });
   } catch (error) {
      res.status(500).json({
         message: "Failed to create user."
      });
      console.error(error);
   }
}