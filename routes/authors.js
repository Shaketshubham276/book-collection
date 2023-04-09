const express=require("express")
const router=express.Router()
const Author=require('../models/author')

router.get('/',async (req,res)=>{
    let searchOptions={}
    if (req.query.name!=null && req.query.name!==""){
        searchOptions.name = new RegExp(req.query.name, 'i')
        // console.log(searchOptions.name)
    }
    //Reg exp "i" tells us that it can be case sensitive or not 


    try{
        const authors=await Author.find(searchOptions)
        res.render('authors/index',
        {authors:authors,
        searchOptions:req.query})
    }
    catch{
        res.render("authors/index")
    }
    
})

router.get('/new',(req,res)=>{
    res.render("authors/new",{author: new Author()})
})
router.post('/',async(req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
        const newAuthor= await author.save()
        res.redirect('authors')
    }
    catch{
        
        res.render('authors/new',{
            author:author,
            errorMessage:"Error creating Author"
        })
    }
})

module.exports=router