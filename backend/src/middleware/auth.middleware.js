import jwt from "jsonwebtoken"

export async function authUser(req, res, next) {
  const token = req.cookies.token;
console.log("COOKIES:", req.cookies);
console.log("TOKEN:", req.cookies?.token);
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
      success: false ,
      err: "No token provided"
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
console.log("VERIFIED USER:", verify);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
       success: false ,
      err: "Invalid token"
    });
  }
}

