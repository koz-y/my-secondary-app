const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const FakeDb = require('./fake-db')
const productRoutes = require('./routes/products')
const path = require( 'path' )

mongoose.connect(config.DB_URI).then(
  () => {
    if ( process.env.NODE_ENV !== "production" ) {
      const fakeDb = new FakeDb()
      // fakeDb.seeDb() // 追加のみ
      // fakeDb.initDb() // 全削除してから追加
    }
  }
)

const app = express()
const port = process.env.PORT || 3001

app.use( '/api/v1/products', productRoutes ) // '/api/v1/products'の時に、productRoutesを使ってルーティング

app.listen( port, () => {
  console.log( `express is running! (listeing at :${port})` )
})

if ( process.env.NODE_ENV === "production" ) {
  const appPath = path.join( __dirname, '..', 'dist', 'my-secondary-app' )
  app.use( express.static(appPath) )
  app.get( "*", (req, res) => {
    res.sendFile( path.resolve( appPath, 'index.html' ) )
  })
}


