const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose =require('mongoose')

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}))
app.use(cors());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/user'),()=> {

//  mongoose.connect.on('connected'),() =>{
  console.log('Mongoose connection is successfull')
 };
var registerSchema =new mongoose.Schema({
  userName:String,
  password:String,
  confirmPassword:String,
  email:String,
  city:String,
  state:String
});

 var User= mongoose.model("User",registerSchema);

app.get('/', function(req, res) {
	res.send('Hello from server')
})

app.post('/enroll', function(req, res) {
  var myData =new User(req.body);
  myData.save()
      .then(_item =>{
        res.sendStatus("data Saved To database");
      })
      .catch(_err =>{
        res.sendStatus(200).sendStatus("unable to save to database");
      });
   console.log(req.body)
   res.status(200).send({"message": "Data received"});
});

app.listen(PORT, function(){
  console.log("Server running on localhost:" + PORT);
});