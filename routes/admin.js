const { Router } = require('express');
var express = require('express');
const { result } = require('lodash');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  
//  productHelpers.getAllProducts().then((products)=>{
 res.render('admin/admin-login')
 //res.render('admin/admin-index',{admin:true})
 // res.render('admin/view-products',{admin:true,products});
 })
 router.get('/block-user/:id',(req,res)=>{
  let userId=req.params.id
  productHelper.blockUser(userId).then((response)=>{
    res.redirect('/admin/view-users')
  })
})

router.get('/unblock-user/:id',(req,res)=>{
  let userId=req.params.id
  productHelper.unBlockUser(userId).then((response)=>{
    res.redirect('/admin/view-users')
  })
})
 router.get('/admin-index', function(req, res, next) {
  console.log(req.session.admin);
  if(req.session.admin==true){
    productHelpers.getAllProducts().then((products)=>{
      res.render('admin/admin-index',{admin:true,products})
  })
  }else{
    res.redirect('/admin')
  }
});





 router.post('/',(req,res)=>{
  if(req.body.email=='adarsh@123' && req.body.password=='123456'){
    req.session.admin=true
    res.redirect('admin/admin-index')
  }else{
    res.redirect('/admin')
  }
})

router.get('/view-products',function(req,res){
  productHelpers.getAllProducts().then((products)=>{
  res.render('admin/view-products',{admin:true,products})
})
})
router.get("/view-users",function(req,res,next){
    productHelpers.getAllUsers().then((users)=>{
    res.render("admin/view-users",{admin:true,users});
  })
 })

  router.get('/add-product',function(req,res){
    res.render('admin/add-product',{admin:true})
  })
  router.post('/add-product',(req,res)=>{

    console.log(req.body);

    console.log(req.files.image)
    
productHelper.addProduct(req.body,(id)=>{
  let image=req.files.image
  image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.render("admin/add-product",{admin:true})

    }
  })
})
  })
router.get('/delete-product/:id',(req,res)=>{
         let proid=req.params.id
        console.log(proid);

        productHelpers.deleteProduct(proid).then((response)=>{
        // productHelpers.deleteProduct(proid).then((response)=>{
          res.redirect('/admin/view-products')
        })

})
router.get('/edit-product/:id',async(req,res)=>{
  let proid=req.params.id
 let product= await productHelpers.getProductDetails(proid)
 console.log(product);


   res.render('admin/edit-product',{product})
 })

 router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-products')
  })
 })
module.exports = router;
