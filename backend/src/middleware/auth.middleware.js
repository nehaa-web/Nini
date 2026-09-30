import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Debugging logs:
  console.log("RECEIVED TOKEN:", token);
  console.log("JWT SECRET:", process.env.JWT_KEY);

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
      success: false,
      err: "No token provided",
    });
  }

  try {
  
    const cleanToken = token.replace(/^"(.*)"$/, "$1").trim();

    const verify = jwt.verify(cleanToken, process.env.JWT_KEY);
    console.log("VERIFIED USER:", verify);
    req.user = verify;
    next();
  } catch (err) {
    console.log("JWT VERIFY ERROR DETAILS:", err.message); // Exact error console me dekhein
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: err.message, // Testing ke liye exact error print karwayen
    });
  }
}
