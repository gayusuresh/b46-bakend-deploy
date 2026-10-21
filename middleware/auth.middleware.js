const jwt = require("jsonwebtoken");
const authMiddleware = (Requiredrole = null) => {
    return (req, res, next) => {
        try {
            const authHeaders = req.headers.authorization; 
            if (!authHeaders  || !authHeaders.startsWith("Bearer "))
            {
             return res.status(404).json({success:false,message:" token invalid"})

            }

            const token = authHeaders.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
             req.userID = decoded.userID;
             req.role = decoded.role;//admin
            if (Requiredrole && req.role !== Requiredrole) //admin &&
            {
              return res.status(401).json({
                success: false,
                message: " token forbidden",
              });
            }
            next();
        }
        catch (err)
        {
            return res.status(500).json({success:false,message:"invalid token"})
        }
    }
}
module.exports = authMiddleware;