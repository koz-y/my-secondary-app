const express = require('express')
const router = express.Router()

const Product = require('../model/product')
const UserCtl = require('../controllers/user')

// Authorizedテスト用
// router.get('/secret', UserCtl.authMiddleware, (req, res) => {
//   return res.json({"secret" : true})
// })

// 一覧取得
router.get('', (req, res) => {
  Product.find({}, (err, foundProducts ) => {
    return res.json( foundProducts )
  })
})

// 個別プロダクト
router.get('/:productId', UserCtl.authMiddleware, (req, res) => {
  const myProductId = req.params.productId
  Product.findById(myProductId, (err, foundProduct ) => {
    if(err) {
      return res.status(422).send(
        { errors: [ {
          title: "Product error", detial: "Product not found!"
        } ] }
      )
    }
    return res.json( foundProduct )
  })
})

module.exports = router
