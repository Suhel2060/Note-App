const jwt=require('jsonwebtoken');
const JWT_SECRET="hiiamakale"
const fetchuser=(req,res,next)=>{
//Get the user from the jwt token and add id to req objects
const token=req.header('auth-token');
if(!token){
    res.status(401).send({error: "please authenticate using a valid credentials"});
}
try {
    const string=jwt.verify(token,JWT_SECRET);
    req.user=string.user;
        next(); 
} catch (error) {
    res.status(401).send({error: "please authenticate using a valid credentials"});

}

}


module.exports=fetchuser;