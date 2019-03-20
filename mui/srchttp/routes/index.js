var express = require('express');
var router = express.Router();
const mongodb=require("mongodb-curd")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/getList', function(req, res, next) {
  mongodb.find("local","tiyan",function(result){
      if(!result){
          res.send({code:0,mes:"error"})
      }else{
          res.send({code:1,mes:"success",data:result})
      }
  })
});
router.post('/addList',function(req, res, next) {
    let card=req.body.card;
    if(req.body.card){
        mongodb.find("local","tiyan",{card:card},function(result){
            if(result.length>0){
                res.send({code:0,mes:"用户存在"})
            }else{
                mongodb.insert("local","tiyan",req.body,function(result){
                    if(!result){
                        res.send({code:0,mes:"error"})
                    }else{
                        res.send({code:1, mes:"success",data:result })
                    }
                })
            }
        })
    }
   // res.end("hello")
});
router.get("/delList",function(req,res,next){
    let id=req.query._id
    mongodb.remove("local","tiyan",{_id:id},function(result){
        if(!result){
            res.send({code:0,mes:"error"})
        }else{
            res.send({code:1,mes:"success",data:result})
        }
    })
})
router.post("/upList",function(req,res,next){
    let id=req.body._id
    console.log(id)
    console.log(req.body)
        mongodb.find("local","tiyan",{_id:id},function(result){
            if(!result){
                res.send({code:0,mes:"error"})
            }else{
                res.send({code:1,mes:"success",data:result})
            }
        })
    
    // res.end("hello")
})
router.post("/upData",function(req,res,next){
    let id=req.body._id;
    //console.log(id)
    mongodb.find("local","tiyan",{_id:id},function(result){
        if(!result){
            res.send({code:0,mes:"error"})
        }else{
            res.send({code:1,mes:"success",data:result})
        }
    })
})
router.post("/newData",function(req,res,next){
    let id=req.body._id
    console.log(id)
    mongodb.update("local","tiyan",[{"_id":id},req.body],function(result){
        if(!result){
            res.send({code:0,mes:"error"})
        }else{
            res.send({code:1,mes:"success",data:result})
        }
    })
})
module.exports = router;
