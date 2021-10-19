const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../model/user')

function notAuthorized(res) {
  return res.status(401).send(
    { errors: [ {
      title: "Not Authorized", detail: "You need to login"
    } ] }
  )
}

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if(!token) { // tokenが無い
    return notAuthorized(res)
  }

  // invalid token
  jwt.verify(token.split(' ')[1], config.SECRET, (err, decodedToken) => {
    if(err) { // トークンが無効
      return res.status(401).send(
        { errors: [ {
          title: "Not Authorized", detail: "Invalid token"
        } ] }
      )
    }
    User.findById(decodedToken.userId, (err, foundUser) => { // ユーザーが存在するか
      if(err) {
        return res.status(401).send(
          { errors: [ {
            title: "Not Authorized", detail: "Invalid token (something went wrong)"
          } ] }
        )
      }
      if(!foundUser) {
        return res.status(401).send(
          { errors: [ {
            title: "Not Authorized", detail: "Invalid token (user not found)"
          } ] }
        )
      }
      next()
    })
  })

}
