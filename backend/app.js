var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routers/item');
var itemRouter2 = require('./routers/item2');
var itemRouter5 = require('./routers/item5');
var itemRouter6 = require('./routers/item6');
var itemRouter7 = require('./routers/item7');

var cors = require('cors');


var app = express();
app.use(cors())
var PORT = 8083;
mongoose.connect("mongodb+srv://poly:H7231qgGCeVeoRpf@cluster0.jbrr8mz.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use('/api', itemRouter);
app.use('/api', itemRouter2);
app.use('/api', itemRouter6);
app.use('/api', itemRouter5);
app.use('/api', itemRouter7);

// if(process.env.Node_ENV==="production"){
//   app.use(express.static(__dirname+'/dist/'));
//   app.get('*',(req,res)=>{
// res.sendFile(__dirname+"/dist/index.html")
//   })
// }

app.listen(PORT, function () {
  console.log(`Listening on port http://localhost:${PORT}`);
});
