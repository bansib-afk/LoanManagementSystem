import User from "../models/User.js";
import Token from "../models/Token.js";
import jwt from "jsonwebtoken";

// // 🔐 Protect Route (Authentication)
// export const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // Check token exists
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res.status(200).json({
//       success: false,
//       redirect: "/login",
//     });
//   }

//   try {
//     // Extract token
//     const token = authHeader.split(" ")[1];

//     const tokenDoc = await Token.findOne({
//       accessToken: token,
//       isValid: true,
//     });

//     if (!tokenDoc) {
//       return res.status(200).json({
//         success: false,
//         redirect: "/login",
//       });
//     }

//     // 🔥 Check user exists in DB
//     const user = await User.findById(tokenDoc._id).select("-password");

//     if (!user) {
//       return res.status(200).json({
//         success: false,
//         redirect: "/login",
//       });
//     }

//     // Attach fresh user data
//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(200).json({
//       success: false,
//       redirect: "/login",
//     });
//   }
// };

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ No token
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(200).json({
      success: false,
      redirect: "/login",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    // 2️⃣ Check token in DB
    const tokenDoc = await Token.findOne({
      accessToken: token,
      isValid: true,
    });

    if (!tokenDoc) {
      return res.status(200).json({
        success: false,
        redirect: "/login",
      });
    }

    // 3️⃣ Decode token (NO verification)
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.id) {
      return res.status(200).json({
        success: false,
        redirect: "/login",
      });
    }

    // 4️⃣ Get user from decoded ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(200).json({
        success: false,
        redirect: "/login",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(200).json({
      success: false,
      redirect: "/login",
    });
  }
};


// 🔐 Role-Based Authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};
