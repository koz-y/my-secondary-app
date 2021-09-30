const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  // author: ObjectId,
  name: { type: String, require: true, max: [60, "最大60文字まで"] },
  price: Number,
  description: String,
  coverimage: String,
  heading1: String,
  heading2: String,
  heading3: String,
  headtext1: String,
  headtext2: String,
  headtext3: String
});

module.exports = mongoose.model( 'Product', ProductSchema)
// この 'Product'の小文字 + 's' つまり、モデル名の複数形がcollection名になる
// mongoose.model(モデル名、スキーマ)

