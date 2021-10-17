const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const config = require('../config')
const User = require('../model/user')

// ユーザーログイン
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if(!email) {
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please fill email"
      } ] }
    )
  }
  if(!password) {
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please fill password"
      } ] }
    )
  }

  User.findOne({email}, (err, foundUser) => {
    if(err) {
      return res.status(422).send(
        { errors: [ {
          title: "User error", detail: "error something went wrong"
        } ] }
      )
    }
    if(!foundUser) { // 登録ユーザー無し
      return res.status(422).send(
        { errors: [ {
          title: "User error", detail: "user is not exist"
        } ] }
      )
    }
    if(!foundUser.hasSamePassword(password)) { // パスワードが一致しない
      return res.status(422).send(
        { errors: [ {
          title: "User error", detail: "Incorrect password"
        } ] }
      )
    }

    // ユーザー認証OKならJWTを返す
    // const token = "I am JsonWebToken"
    const token = jwt.sign({
      userid: foundUser._id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' });

    return res.json(token)
  })

})

// ユーザー新規登録
router.post('/register', (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmpassword = req.body.confirmpassword

  if(!username) {
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please fill username"
      } ] }
    )
  }
  if(!email) {
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please fill email"
      } ] }
    )
  }
  if(!password) {
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please fill password"
      } ] }
    )
  }
  if(password !== confirmpassword){
    return res.status(422).send(
      { errors: [ {
        title: "User error", detail: "Please check password"
      } ] }
    )
  }

  User.findOne({email}, (err, foundUser ) => {
    if(err) {
      return res.status(422).send(
        { errors: [ {
          title: "User error", detail: "error something went wrong"
        } ] }
      )
    }
    if (foundUser) {
      return res.status(422).send(
        { errors: [ {
          title: "User error", detail: "user alrady exist"
        } ] }
      )
    }

    // 条件クリアしたら登録
    const user = new User({ username, email, password })
    user.save((err) => {
      if(err) {
        return res.status(422).send(
          { errors: [ {
            title: "User error", detail: "error something went wrong"
          } ] }
        )
      }
      return res.json({ "registered": true })
    })

  })

})

module.exports = router
