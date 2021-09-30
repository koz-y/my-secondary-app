const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const FakeDb = require('./fake-db')
const productRoutes = require('./routes/products')


mongoose.connect(config.DB_URI).then(
  () => {
    const fakeDb = new FakeDb()
    // fakeDb.seeDb() // 追加のみ
    fakeDb.initDb() // 全削除してから追加
  }
)

const app = express()
const port = process.env.PORT || 3001

app.use( '/api/v1/products', productRoutes ) // '/api/v1/products'の時に、productRoutesを使ってルーティング
// app.get( '/products', (req, res) => {
//   res.json( { 'success' : true } )
// })

app.listen( port, () => {
  console.log( `express is running! (listeing at :${port})` )
})

