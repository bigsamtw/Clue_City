
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");

router.get('/',function(req,res){
  res.sendFile('setting.html', {
    root : 'CluesCity'
  });
});
/*
router.post('/setting', urlencodedParser,function(req,res){
    console.log(req.body);
    mongoOperation.mongoInsert(req.body);
    mongoOperation.mongoFind();

});
*/
module.exports = router;
