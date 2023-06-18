


const {constants} = require('../constants');

const errorhandler = (err,req,res,next)=>{
 
    
    const status = res.statusCode ? res.statusCode : 500;

    switch (status) {
        case constants.VALIDATION_ERROR :
            res.json({title:"Validation failed",message: err.message , stackTrace:err.stack});        
            break;
        
        case constants.FORBIDDEN :
            res.json({title:"Forbidden",message: err.message , stackTrace:err.stack});        
            break;

       case constants.NOT_FOUND :
            res.json({title:"Not Found",message: err.message , stackTrace:err.stack});                        break;
   
        case constants.UNAUTHORIZED :
            res.json({title:"UnAuthorized",message: err.message , stackTrace:err.stack});        
            break;        
        case constants.SERVER_ERROR:
            res.json({title:"Server Failed",message: err.message , stackTrace:err.stack});        
            break;
        default:
        console.log("no error all good");
            break;
    }

    

};

module.exports = errorhandler;
