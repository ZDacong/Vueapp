let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;//创建客户端	
let ObjectID = mongodb.ObjectID;
let mongoct= require("mongodb").MongoClient;
// let ObjectID =require("mongodb").ObjectID;
// module.exports = (opts,callback)=>{
//     opts = opts || {};
//     opts.url = opts.url || 'mongodb://127.0.0.1:27017';
//     opts.dbName = opts.dbName || 'dyw';
//     opts.collectionName = opts.collectionName || 'user';  
//     mongoct.connect(opts.url,{useNewUrlParser:true},(err,client)=>{
//         if(!err){
//             let db = client.db(opts.dbName);
//             let collection = db.collection(opts.collectionName);
//             callback(client,collection,ObjectID);
//         }else{
//             console.log("mongodb服务端链接失败");
//         }
//     })
// }

module.exports = (opts,callback) => {
  
  opts = opts || {};
  opts.url = opts.url || 'mongodb://127.0.0.1:27017';
  opts.dbName = opts.dbName || 'local';
  opts.collectionName = opts.collectionName || 'user'; 

  //创建链接	
  mongoCt.connect(opts.url,{ useNewUrlParser: true },(err,client)=>{

    if(!err){
      //链库
      // let db = client.db(opts.dbName);

      //链接表
      // let collectionName = db.collection(opts.collectionName);
      let db = client.db(opts.dbName);
      let collection = db.collection(opts.collectionName);

      //查询
      callback(collection,client,ObjectID)

    }else{
      console.log('链接mongodb服务端失败')
    }

  })
}


// url dbName collectionName 
/* module.exports = (opts,callback) => {
  opts = opts || {};
  opts.url = opts.url || 'mongodb://127.0.0.1:27017';
  opts.dbName = opts.dbName || '1905';
  opts.collectionName = opts.collectionName || 'user';

  //创建链接	
  mongoCt.connect(opts.url,{ useNewUrlParser: true },(err,client)=>{

    if(!err){
      //链库
      let db = client.db(opts.dbName);

      //链接表
      let collection = db.collection(opts.collectionName);

      //查询
      callback(collection,client)

    }else{
      console.log('链接mongodb服务端失败')
    }

  })
} */


// url dbName collectionName 
/* module.exports = (opts,callback) => {
  opts = opts || {};
  opts.url = opts.url || 'mongodb://127.0.0.1:27017';
  opts.dbName = opts.dbName || '1905';
  opts.collectionName = opts.collectionName || 'user';

  //创建链接	
  mongoCt.connect(opts.url,{ useNewUrlParser: true },(err,client)=>{

    if(!err){
      //链库
      let db = client.db(opts.dbName);

      //链接表
      let collection = db.collection(opts.collectionName);

      //查询
      callback(collection,client)

    }else{
      console.log('链接mongodb服务端失败')
    }

  })
} */

