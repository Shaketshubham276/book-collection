// if (process.env.NODE_ENV!=='production'){
//     require('dotenv').parse()
// }
require('dotenv').config()
const express=require("express")
const expressLayouts=require("express-ejs-layouts")
const indexRouter=require('./routes/index')

const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true
})
const db=mongoose.connection
db.on('erroe',error=>console.error(error))
db.once('open',()=>console.log("connected to mongo"))


const app=express()


app.set('views',__dirname +'/views')
app.set('view engine',"ejs")
app.set('layout',"layouts/layout")


app.use(expressLayouts)
app.use(express.static('/public'))

app.use('/',indexRouter)




app.listen(process.env.port || 3000)