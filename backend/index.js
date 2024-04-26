
const connectToMongo=require('./db')
const express=require('express')
var cors = require('cors')
connectToMongo();
var app = express()
app.use(cors())
const port = 5000;

//middle ware to work with application json
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.use('/api/notes',require('./routes/notes'))



// app.get('/', (req, res) => {
//   res.send('Hello SUhel!')
// })


// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello login!')
// })
// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello aignup!')
// })

app.listen(port, () => {
  console.log(`iNotebook app backend listening on port ${port}`)
})
