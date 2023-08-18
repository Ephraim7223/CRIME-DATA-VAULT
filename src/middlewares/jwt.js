import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    const token = req.headers["Authorisation"].split("=")[1].split(";")[0];

    if(!token) return res.status(401).json({
    message:  "You are not authenticated"
}); 


    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if(err) return res.status(401).json({
        message:  "Token is not valid"
    }); 
    user = payload.id;
    next()
});
};
