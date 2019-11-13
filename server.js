const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./controller/index');
const bodyparser = require('body-parser');
var models = require('./models/index');
const feedback = require('./controller/users/feeddata');

app.use(cors());
//endpoints
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.use('/api', routes);
app.use('/newcustomer',feedback);

models.db.connection
  .sync({
      force: false,
      logging: console.log,
  })
  .then(() => {
    app.listen(3000 ,console.log(`server start on port 3000`));
  });

  //404 handler
app.use(function(req, res, next) {
  console.error(err);
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    
    }
  });
  
  console.log(err);
});


app.get('/', (req, res) =>{
    res.send("welcome");

});



