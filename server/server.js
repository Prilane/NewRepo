/* This connects the portfolio to @mongodb-js 
Mongoose is a library that lets you interact with mongoDb */
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://local host:27017/april', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("connected to mongoDb");
// }).catch((err) => {
//     console.error("mongoDb connection error:", err)
// })//connects to our mongoDb local database
// app.post('/contact', async(req, res)=>{
//     try{
//         const{name, email, message} = req.body;  //object
//         const newMessage = new Message({name, email, message});
//         await newMessage.save();
//         res.send('<p>Message recieved. Thank you!</p>');
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).send('<p>Failed to save message.</p>');
//     }
// });
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const contactRoute = require('./routes/contact');
const { log } = require('console');
const { send } = require('process');
const app = express();
const PORT = process.env.PORT  || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log('ContactRoute is ', typeof contactRoute);
app.use('/contact', contactRoute);
app.listen(PORT, () => console.log(`Server running on http:/localhost:${PORT}`));
app.use(express.static(path.join(__dirname, '..')));
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
//Handle 404 errors
app.use((req, res) => {
res.status(404).send('<h1>404 Not Found</h1>');
});
//Handle 500 errors
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('<h1> 500 Internal Server Error</h1>');
});
console.log('contactRoute:', contactRoute);