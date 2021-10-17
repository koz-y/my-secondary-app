const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  // author: ObjectId,
  username: {
    type: String,
    require: true,
    max: [60, "ユーザー名は最大60文字までです"]
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    max: [60, "Eメールは最大60文字までです"]
  },
  password: {
    type: String,
    require: true,
    min: [6, "パスワードは6文字以上にしてください"],
    max: [20, "最大20文字まで"]
  }
})

UserSchema.methods.hasSamePassword = function(inputPassword) {
  const user = this
  return bcrypt.compareSync(inputPassword, user.password)
}

UserSchema.pre('save', function(next) {
  const saltRounds = 10
  const user = this

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash
        next()
    })
  })
})


module.exports = mongoose.model( 'User', UserSchema)
// この 'User'の小文字 + 's' つまり、モデル名の複数形usersがcollection名になる
// mongoose.model(モデル名、スキーマ)

