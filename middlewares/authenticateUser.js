import jwt from "jsonwebtoken";
import { env } from "../config/validateEnv.js";

export default async function authenticateUser(req, res, next) {
   const tokenString = req.headers.authorization;

   if (tokenString == null) {
      next();
   } else {
      const token = tokenString.replace("Bearer ", "");
      try {
         const decoded = await jwt.verify(token, env.JWT_KEY);
         req.user = decoded;
         next();
      } catch (error) {
         return res.status(500).json({
            message: error.message || "Internal server error"
         });
      }
   }
}