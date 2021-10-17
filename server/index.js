const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const FakeDb = require('./fake-db')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
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

const port = process.env.PORT || 3001

const app = express()
app.use(express.json())

app.use( '/api/v1/products', productRoutes ) // '/api/v1/products'の時に、productRoutesを使ってルーティング
app.use( '/api/v1/users', userRoutes )



app.listen( port, () => {
  console.log( `express is running! (listeing at :${port})` )
})

if ( process.env.NODE_ENV === "production" ) { // producton モードの時は、フロントエンドのアクセスにも応答
  const appPath = path.join( __dirname, '..', 'dist', 'my-secondary-app' )
  app.use( express.static(appPath) )
  app.get( "*", (req, res) => {
    res.sendFile( path.resolve( appPath, 'index.html' ) )
  })
}


