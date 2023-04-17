const express=require("express")
const router=express.Router()

router.get('/',async (req,res)=>{
    try{
        books=Book.find().sort({createAt:'desc'}).limit(10).exec()
        

    }
    catch{
        books=[]
    }
    res.render("index",{books:books })
})


module.exports=router
