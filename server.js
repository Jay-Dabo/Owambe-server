const express = require('express'); // Require Express as Web Server 
const bodyParser = require('body-parser') // Require Body-Parser as middleware to handle form data
const morgan = require('morgan') // Morgan to log the route actions
const cors = require('cors') // Require CORS to accpt cross-site scripts
const PORT = 3000 // Set API Port to 3000 on Express Server)
const api = require('./routes/api')

const app = express() // Express Server Instance 

app.use(morgan('dev'))
app.use(cors()) // Cors for Cross-Site Scripting

// Specify BodyParser to handle JSON Data
app.use(bodyParser.json())

app.use('/api', api)

app.get('/', function(req, res){
	res.send('Welcome to the Owambe API!!')
})

// handle requests not handled by the routes
app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status(404);
	next(error)
})
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})

app.listen(PORT, function(){
	console.log('Owambe API Server running on PORT; ' + PORT)
})