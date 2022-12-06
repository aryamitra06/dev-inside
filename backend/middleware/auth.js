import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
        //Get token from header
        const token = req.headers.authorization;

        //Check if not token
        if(!token){
            return res.status(401).json({msg: "No token found"});
        }

        //Verify token
        try {
            const decodedToken = jwt.verify(token, "meawmeaw")
            req.user = decodedToken.user;
            next();
        } catch (error) {
            res.status(401).json({msg: "Invalid token"})
        }
}