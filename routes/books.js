const express=require("express")
const router=express.Router()
const Book=require('../models/book')
const multer=require("multer")
const Author=require('../models/author')
const path=require('path')
const imageMimeTypes=['image/jpeg','images/png','images/gif']
// The imageMimeTypes helps to take the input data of which type you have inclueded
const uploadPath=path.join('public',Book.coverImageBasePath)
const upload=multer({
    dest:uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
    // file Filter helps to filter which files our server accept
})

//All books route 
router.get('/',async (req,res)=>{
    try{
        const books=await Book.find({})
        res.render('books/index',{
            books:books,
            searchOptions:req.query
        })
    }
    catch{
        
        res.redirect('/')
    }
    
})
//New Books Route
router.get('/new',async (req,res)=>{
    renderNewPage(res,new Book())
    
})


//Create Book Route

// the below upload.single('cover' ) means that we have to upload a single file name cover
router.post('/',upload.single('cover'),async (req,res)=>{
    const fileName=req.file!=null ? req.file.filename:null
    const book=new Book({
    title:req.body.title,
    author:req.body.author,
    publishDate:new Date(req.body.publishDate),
    pageCount:req.body.pageCount,
    description:req.body.description,

    coverImageName:fileName

   })
   try{
    const newBook= await book.save()
    // res.redirect(`books/${newAuthor.id}`)
    res.redirect(`books`)
   }
   catch{
    if (book.coverImageName!=null){
        removeBookCover(book.coverImageName)
    }
    renderNewPage(res,book,true)
   }
})

function removeBookCover(fileName){
    fs.unlink(path.join(uploadPath,fileName),err=>{
        if (err) console.error(err)

    // fs helps to unlink the book folder if the file is added then it gets unloaded
    })
}

async function renderNewPage (res,book,hasError=false){
    try{
            
        const authors=await Author.find({})
        const book= new Book()
        const params={
            authors:authors,
            book:book
        }
        if (hasError) params.errorMessage=`Error Creating BOOK`
        // params.errorMessage creates an error Message and shows error creating
        
        res.render('books/new',params)
            
        
    }
    catch{
        res.redirect('/books')
    }

}


module.exports=router