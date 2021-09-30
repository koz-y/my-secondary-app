const Product = require( './model/product' )

class FakeDb {

  constructor() {
    this.products = [
      {
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        coverimage: './assets/img/phone-cover.jpg',
        heading1: '夜明け前',
        heading2: '吾輩は猫である',
        heading3: '人間失格',
        headtext1: '木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。',
        headtext2: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
        headtext3: '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。'
      },
      {
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        coverimage: './assets/img/phone-cover.jpg',
        heading1: '夜明け前',
        heading2: '吾輩は猫である',
        heading3: '人間失格',
        headtext1: '一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。',
        headtext2: '吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。',
        headtext3: '自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。'
      },
      {
        name: 'Phone Neo',
        price: 499,
        description: 'A special phone with one of the best character',
        coverimage: './assets/img/phone-cover.jpg',
        heading1: '夜明け前',
        heading2: '吾輩は猫である',
        heading3: '人間失格',
        headtext1: '道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。',
        headtext2: 'この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。',
        headtext3: '自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。'
      },
      {
        name: 'Phone Standard',
        price: 299,
        description: 'A standard phone with one of the best price',
        coverimage: './assets/img/phone-cover.jpg',
        heading1: '夜明け前',
        heading2: '吾輩は猫である',
        heading3: '人間失格',
        headtext1: '名高い桟も、蔦のかずらを頼みにしたような危い場処ではなくなって、徳川時代の末にはすでに渡ることのできる橋であった。',
        headtext2: 'ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。',
        headtext3: 'しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。'
      }
    ]
  }


  async initDb() {
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb() {
    await Product.deleteMany({})
  }

  pushProductsToDb() {
    this.products.forEach(
      (product) => {
        const myProduct = new Product(product)
        myProduct.save() // Document（Record）毎に都度保存
      }
    )
  }

  seeDb() {
    this.pushProductsToDb()
  }
}

module.exports = FakeDb
