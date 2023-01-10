const errorMsg = (error, req, res, next)=>{
    if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        res.status(400).json({message: error.errors[0].message})
    } else if(error.name=='invalid_data'){
        res.status(401).json({message:'Invalid email or password'})
    } else if(error.name =='not_found'){
        res.status(404).json({message : 'data not found'})
    }
}
module.exports = errorMsg