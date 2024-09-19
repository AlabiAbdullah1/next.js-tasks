/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";

export const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Authentication required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
