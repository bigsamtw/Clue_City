let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");

router.get('/',function(req,res){
  res.sendFile('hard.html', {
    root : 'CluesCity'
  });
});

router.post('/hard', urlencodedParser,function(req,res){
    res.send(`${req.body.name}`);
});

router.post('/check', urlencodedParser,function(req,res){
//    console.log(req.body);
    databaseCollection = "user";
    mongoOperation.checkinvite(
        databaseCollection ,
        req.body.sender , 
        req.body
    ); 
});
module.exports = router;
