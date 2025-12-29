const authorize = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message : "sorry you dont have permission",});
        }
        next();
    };
};

module.exports = { authorise };
