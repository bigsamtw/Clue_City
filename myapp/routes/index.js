
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");

router.get('/',function(req,res){
  res.sendFile('index.html', {
    root : 'CluesCity'
  });
});

module.exports = router;
