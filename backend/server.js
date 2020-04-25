const express = require('express')
//const cors = require('cors');
const app = express()
//const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path')
const db = require('./db')
const { User, Task } = db.models

app.use(express.json())

//app.use('/api/tasks', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

// app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../index.html')))

app.get('/api/users', (req, res, next) => {
    User.findTasks()
      .then(users => res.send(users))
      .catch(next)
})

app.get('/api/tasks', (req, res, next) => {
    Task.findAll()
      .then(tasks => res.send(tasks))
      .catch(next)
})

app.post('/api/tasks', (req, res, next) => {
    Task.create(req.body)
      .then(task => res.status(201).send(task))
      .catch(next)
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000

db.syncAndSeed()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`))
  })