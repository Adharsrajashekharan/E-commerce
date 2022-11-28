var db=require('../config/connection')
var collection=require('../config/collections')
const { reject } = require('lodash')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId
module.exports={
    addProduct:(product,callback)=>{
        console.log(product)
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            callback(data.insertedId)
    })
},
getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
    })
},

getAntiqueProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find({category:"Antique"}).toArray()
        resolve(products)
    })
},
getFestiveProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find({category:"Festive"}).toArray()
        resolve(products)
    })
},
getLightsProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find({category:"Lights"}).toArray()
        resolve(products)
    })
},
getAllUsers:()=>{
    return new Promise(async(resolve,reject)=>{
        let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
        resolve(users)
    })
},
deleteProduct:(proid)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proid)}).then((response)=>{
            console.log();
            resolve(response)
        })
    })
},





getProductDetails:(proid)=>{
    
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proid)}).then((product)=>{
            console.log(product);
            resolve(product)
        })
    })
},
updateProduct:(proid,proDetails)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proid)},{
            $set:{
                name:proDetails.name,
                description:proDetails.description,
                price:proDetails.price,
                category:proDetails.category
            }
        
        
        }).then((response)=>{
            resolve()
        })

    })
},

getSingleProducts:(proId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
            resolve(product);
        })
    })
},
blockUser:(userId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION)
        .updateOne({_id:objectId(userId)},{
            $set:{
               Access:false 
            }
        }).then((response)=>{
            resolve()
        })
    })
},
unBlockUser:(userId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION)
        .updateOne({_id:objectId(userId)},{
            $set:{
                Access:true
            }
        }).then((response)=>{
            resolve()
        })
    })
}

}
