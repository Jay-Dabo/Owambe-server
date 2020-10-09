const express = require('express'); // Require Express as Web Server 
const bodyParser = require('body-parser') // Require Body-Parser as middleware to handle form data
const cors = require('cors') // Require CORS to accpt cross-site scripts
const PORT = 3000 // Set API Port to 3000 on Express Server)
const api = require('./routes/api')

const app = express() // Express Server Instance 

app.use(cors()) // Cors for Cross-Site Scripting

// Specify BodyParser to handle JSON Data
app.use(bodyParser.json())

app.use('/api', api)

app.get('/', function(req, res){
	res.send('Welcome to Owambe API!!')
})

app.listen(process.env.PORT || PORT, function(){
	console.log('Owambe API Server running')
})