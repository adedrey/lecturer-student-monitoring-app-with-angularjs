const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_key_should_be_longer');
        req.userId = decodedToken.userId;
        // console.log()
        next()
    } catch(error){
        res.status(401).json({
            message : 'User Auth Failed'
        });
    }
}
