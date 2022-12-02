const appendToken = (req,res,next) => {
    const {ACCESS_TOKEN} = req?.session.JWT
    if (ACCESS_TOKEN) {
        next()
    }else{
        throw new Error('Validation failed')
    }

}

module.exports  =  { appendToken }