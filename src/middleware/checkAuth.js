import jwt from "jsonwebtoken"

export default function Auth(req,res,next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    req.userData = decoded;
    next();
} catch (error) {
    return res.status(401).json({
        message: 'Unauthorized'
    });
}
};
 
