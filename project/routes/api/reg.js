let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb');
let fs = require('fs');
let pathLib = require('path');
let bcrypt = require('bcrypt');

router.post('/',(req,res,next)=>{
    //console.log('reg');
    let {username,password,nikename,icon} = req.body;//username/password是必传参数，不传不兜库
    if(!username || !password){
        res.send({err:1,msg:'用户名和密码为必传参数'})
        return;
    }
    let time = Date.now();//生成注册时间
    password = bcrypt.hashSync(password, 10); 
    nikename = nikename || '系统给的'; //借助第三方昵称生成库

    if(!req.file && req.files.length>0 ){
        //改名 整合路径 存到 icon
        fs.renameSync(
          req.files[0].path,
          req.files[0].path + pathLib.parse(req.files[0].originalname).ext
        )
        icon = '/upload/user/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext
      }else{
        icon = '/upload/111.jpeg';
      }

    //兜库校验username,password
    mgdb({
        collectionName:'user'
    },(collection,client)=>{
        collection.find({
            username
        },{
        }).toArray((err,result)=>{
            if(!err){
                if(result.length>0){
                    //不通过 返回错误信息
                    res.send({err:1,msg:'用户名已经存在'});
                    // fs.unlinkSync('./public'+icon)
                    if(icon.indexOf('111') === -1){
                        fs.unlinkSync('./public'+icon)
                      }
                    client.close()
                }else{
                    //通过 返回用户数据 插入库 返回插入后的数据
                    collection.insertOne({
                        username,password,nikename,time,icon
                    },(err,result)=>{
                        if(!err){
                            delete result.ops[0].password
                            res.send({err:0,msg:'注册成功',data:result.ops[0]})
                        }else{
                            res.send({err:1,msg:'user集合操作失败'})
                            client.close()
                        }
                    })
                }
            }else{
                res.send({err:1,msg:'集合操作失败 '})
                client.close()
            }
        })
    })
});
module.exports = router;