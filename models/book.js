const mongoose=require('mongoose')
const path=require('path')
const coverImageBasePath='uploads/bookCovers'

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String

    },
    publishDate:{
        type:Date,
        required:true

    },
    pageCount:{
        type:Number,
        required:true

    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,required:true,
        ref:"Author"
    }
})


// We havent used arrow function because we have to use this property at this point


// if we call coverImagePath then the below function will be called
bookSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName!=null)
    return path.join('/',coverImageBasePath,this.coverImageName)
    // this.coverImageName corresponds to book that we are looking for inside the coverImageBasePath
})


module.exports=mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath = coverImageBasePath