const express = require('express')
require('dotenv').config()
require('./database/connection')


//Category
const CategoryRoute = require('./routes/categoryRoute')

const app = express()
app.use(express.json())

app.get('/hello', (request, response)=>{
    response.send("HELLO THERE!!!")
})

/*
app.method(endpoint, function)

method - get/post/put/delete
endpoint - route to connect frontend
function - what to do
    (request, respone)=>{}
        request > data recieved from user/frontend
            body-> using form
            params/query -> using url
            respone -> data sent to user/frontend
*/

const port = process.env.PORT

app.use(CategoryRoute)


//Product

const ProductRoute = require('./routes/productRoute')

app.use(ProductRoute)


//User
const UserRoute = require('./routes/userRoute')
app.use(UserRoute)




app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})

