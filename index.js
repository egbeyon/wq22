const express = require('express');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}


const uri = process.env.ATLAS_URI
//const uri = process.env.COMPASS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
//mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Routes
const teamRouter = require('./routes/teams')
const userRouter = require('./routes/users');
const entryRouter = require('./routes/entry');
const alertRouter = require('./routes/alert')

const app = express();

app.use(cors())
const port = process.env.PORT || 6000;


app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(entryRouter);
app.use(teamRouter);
app.use(alertRouter)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.listen(port, () => console.log(`app is running in PORT: ${port}`));

