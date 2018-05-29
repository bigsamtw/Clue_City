
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");
var sender_info = "sender_info"; 
var be_sender_id = null; 
var team;

router.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile('addfriend.html', {
    root : 'CluesCity'
  });
});

router.post('/team', urlencodedParser,function(req,res){
    let mongoCollection = "team";
    team = req.body; 
    mongoOperation.mongoFind( mongoCollection , req.body);
});

router.post('/teammate', urlencodedParser,function(req,res){
    let mongoCollection = "team";
    mongoOperation.addteammate( mongoCollection , team , req.body);
});

router.post('/signal', urlencodedParser, function(req,res,callback){
    var mongoCollection = "user";
    console.log(be_sender_id);
    console.log("--------------");
    let data = be_sender_id ;//= mongoOperation.mongoFindinvite( mongoCollection , be_sender_id);
    console.log(data);
    res.send(data);
    //callback = a(res, data);
});
/*
function a(res, data){
  res.send(data);
  console.log(data);
}
*/
router.post('/checkresponse', urlencodedParser,function(req,res,callback){
    var mongoCollection = "user";
    console.log("test");
    let data = mongoOperation.mongoFind_checkresponse( mongoCollection , sender_info);
//    callback = function(){
      res.send(data);
//    }
});

router.post('/invite', urlencodedParser,function(req,res){ //ok
      sender_info = req.body.sender;
//      be_sender_id = req.body.to;      
    be_sender_id = {sender:"994408210718019",to:"2054568394572464"};
    let receiver = req.body.to;
    let mongoCollection = "user";
    mongoOperation.invitation( mongoCollection , receiver ,req.body);
});

module.exports = router;
