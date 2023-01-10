const errorMsg = (error, req, res, next)=>{
    if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        res.status(400).json({message: error.errors[0].message})
    } else if(error.name=='invalid_data'){
        res.status(401).json({message:'Invalid email or password'})
    } else if(error.name =='not_found' || error.name=='SequelizeForeignKeyConstraintError'){
        res.status(404).json({message : 'data not found'})
    } else if(error.name == 'forbidden'){
        res.status(403).json({message:'not authorize'})
    }
}
module.exports = errorMsg