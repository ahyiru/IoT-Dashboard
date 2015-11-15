var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/device');

// 数据库连接后，可以对open和error事件指定监听函数。
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('连接成功')
		//在这里创建你的模式和模型
});

var Schema = mongoose.Schema;
/*var userSchema = new Schema({
	name     : String,
	password : String
})*/

var devSchema = new mongoose.Schema({
  deviceId:{ type: String, unique: true },
  macAddr: String,
  status: String,
  authorize: Boolean
});

var Dev = mongoose.model('Dev', devSchema);

//倒出模型
module.exports = Dev;


